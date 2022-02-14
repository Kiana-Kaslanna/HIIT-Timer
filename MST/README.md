# MST

A web app that provide a **M**ulti-**S**port **T**imer service.
- A timer consist of multiple small timers
- Excellent choice for **M**ulti-**S**port Training. For example:
  - Run for 120 second
  - then, Jump rope for 60 second
  - then, Push up for 30 second
  - then, Walk to relex for 40 second
  - ...

## Enter
<img src="https://github.com/Nanaka-Twigs/MST/blob/master/README/mst%20(1).png" width="400">

This web app support user authentication, security by php's `password_hash()` function.
- Free web hosting make synchronization with SQL very very very slow. Don't use it.

## Create Timer
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://github.com/Nanaka-Twigs/MST/blob/master/README/mst%20(3).png" width="400">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://github.com/Nanaka-Twigs/MST/blob/master/README/mst%20(2).png" width="400">

- Click the top-right green button to enter the *add-timer* page

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://github.com/Nanaka-Twigs/MST/blob/master/README/mst%20(4).png" width="400">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://github.com/Nanaka-Twigs/MST/blob/master/README/mst%20(5).png" width="400">

- Click the green button of component "add an exercise" to add an exercise to the timer. You can have as many timer as you want (haven't test it)
- Top right green button is for submitting the creation request; red button is for closing the page

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://github.com/Nanaka-Twigs/MST/blob/master/README/mst%20(6).png" width="400">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://github.com/Nanaka-Twigs/MST/blob/master/README/mst%20(7).png" width="400">

- After adding, the created timer will be displayed in home page. The timer will be saved locally by `localStorage`, or saved on cloud SQL server if log in (test pass for local SQL server but not cloud)
- You can also change settings by clicking the bottom tab. Your setting will be saved locally by `localStorage`.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://github.com/Nanaka-Twigs/MST/blob/master/README/mst%20(8).png" width="400">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://github.com/Nanaka-Twigs/MST/blob/master/README/mst%20(9).png" width="400">

- Click the timer to enter the *timer* page.
- Click *start* to start.
- After start, you can click *reset* to stop and reset the timer
