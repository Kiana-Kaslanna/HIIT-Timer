<?php
class Database
{
    public $db;

    function __construct($hostname, $username, $password, $database)
    {
        $this->db = mysqli_connect($hostname, $username, $password, $database);
        if ($this->db->connect_error) { // not connected
            // echo '<script>console.log("' . mysqli_connect_error() . '");</script>';
        } else {
            if (!$this->table_exist('user')) {
                $sql = "
                    CREATE TABLE user (
                        uid VARCHAR(30) PRIMARY KEY,
                        psw VARCHAR(255) NOT NULL
                    )
                ";
                $this->sql_post($sql);
            }
            if (!$this->table_exist('record')) {
                $sql = "
                    CREATE TABLE record (
                        uid VARCHAR(30) NOT NULL,
                        title VARCHAR(30) NOT NULL,
                        eid INT NOT NULL,
                        name VARCHAR(30),
                        time INT NOT NULL,
                        PRIMARY KEY (uid, title, eid)
                    )
                ";
                $this->sql_post($sql);
            }
        }
    }

    function table_exist($table)
    {
        $req = $this->db->query('SELECT * FROM ' . $table);
        if (!$req) {
            return false;
        } else {
            return true;
        }
    }

    function sql_post($sql)
    {
        if ($this->db->query($sql) === TRUE) {
            return true;
        } else {
            return false;
        }
    }
    function sql_get($sql)
    {
        $req = $this->db->query($sql);
        if (!$req) {
            return false;
        } else {
            return $req->fetch_assoc();
        }
    }

    function sql_get_all($sql)
    {
        $req = $this->db->query($sql);
        if (!$req) {
            return false;
        } else {
            return $req->fetch_all();
        }
    }

    function drop_all()
    {
    }
}

class Repo
{
    public $db;
    function __construct()
    {
        $this->db = new Database('sql109.epizy.com', 'epiz_30270848', 'xzRUZVocdgx', 'epiz_30270848_MST');
    }

    function set_user($uid, $psw)
    {
        $psw = password_hash($psw, PASSWORD_BCRYPT);
        $sql = "
            INSERT INTO user (uid, psw) 
                VALUES ('$uid', '$psw');
            ";
        $this->db->sql_post($sql);
    }

    function get_user($uid)
    {
        $sql = "
            SELECT * FROM user WHERE uid = '$uid'
        ";
        $result = $this->db->sql_get($sql);
        if (!$result) {
            return false;
        } else {
            return json_encode($result);
        }
    }

    function valid_username($usn)
    {
        if (!$this->get_user($usn)) {
            return true;
        } else {
            return false;
        }
    }

    function user_auth($uid, $psw)
    {
        // $psw = password_hash($psw, PASSWORD_BCRYPT);
        if (!$this->valid_username($uid)) {
            // usn exist, login
            $sql = "
                SELECT * FROM user WHERE uid = '$uid'
                ";
            $result = $this->db->sql_get($sql);
            if ((!$result) || (!password_verify($psw, json_decode(json_encode($result))->psw))) {
                return false;
            } else {
                return true;
            }
        } else {
            // usn not exist
            $this->set_user($uid, $psw);
            return true;
        }
    }

    function timer_exist($uid, $timer)
    {
        $sql = "
            SELECT * FROM record WHERE uid = '$uid' AND title = '$timer->title'
        ";
        $result = $this->db->sql_get($sql);
        if (!$result) {
            return false;
        } else {
            return true;
        }
    }

    function record_timer($uid, $timer)
    {
        $timer = json_decode($timer);
        if (!$this->timer_exist($uid, $timer)) {
            for ($i = 0; $i < sizeof($timer->timers); $i++) {
                $exi = $timer->timers[$i];
                $sql = "
                    INSERT INTO record (uid, title, eid, name, time) VALUES ('$uid', '$timer->title', '$i', '$exi->name', '$exi->time')
                ";
                $this->db->sql_post($sql);
            }
            return true;
        } else {
            return false;
        }
    }

    function get_timers($uid)
    {
        $sql = "
            SELECT * FROM record WHERE uid = '$uid' ORDER BY title, eid
        ";
        return json_decode(json_encode($this->db->sql_get_all($sql)));
    }

    function delete_timer($uid, $title)
    {
        $sql = "
            DELETE FROM record WHERE uid = '$uid' AND title = '$title';
        ";
        $this->db->sql_post($sql);
        // return json_decode(json_encode($this->db->sql_get_all($sql)));
    }

    function delete_user($uid)
    {
        $sql = "
            DELETE FROM user WHERE uid = '$uid';
        ";
        $this->db->sql_post($sql);
        $sql = "
            DELETE FROM record WHERE uid = '$uid';
        ";
        $this->db->sql_post($sql);
    }
}

$repo = new Repo();

