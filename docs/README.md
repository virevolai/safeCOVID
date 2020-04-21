[![IMAGE ALT TEXT HERE](http://img.youtube.com/vi/rT-P0g_3l2M/0.jpg)](https://youtu.be/rT-P0g_3l2M)

Let's stop COVID19 together
-------


COVID is the defining challenge of our lifetimes. 

One that central authorities failed miserably at. We can hope that they will do the right thing, eventually. But hope is not a strategy.

We need to reopen the society, but not lose our rights in the process. Once freedom is lost, it won't just be handed back.

Sadly the narrative is that we need to cede more control to governments and corporations... the same ones who are still not adopting the scientific evidence on masks and tests. 

We do not need more top-down approaches, more surveillance. And even with privacy preserving approaches marketed by Google and Apple, we do not have a way to get mass adoption.

Without mass adoption, those approaches are not effective. The exemplar, Singapore's app currently has an adoption rate of less than 15%. 

I'm sure you can see what will happen next in name of public safety.

"If you are willing to lose rights, you never deserved them to begin with" 

There is another way.

Instead of top-down, a better way to build an antifragile society is bottoms-up, a.k.a Talebian Localism.

We need to hold each other accountable and grow this from the ground up.

How does it work?
----------

You are a responsible person and trust yourself. You trust your family to do the right thing as well... what about your neighbours? The person at the checkout counter while you pick up a pack of gum?

safeCOVID teaches you a new set of skills, these are - creating a mask cheaply, wearing it properly, and washing hands.

Once you have gone through those and shared with those living with you, you are safeCOVID level 1 in the app.

When you meet someone in person, you must insist that they show you their safeCOVID level. If they cannot, or are not wearing a mask, you must assume that they are unsafe and politely practice social distancing. The current recommendation is 6ft, or 2m. 

Please do not harass them, but encourage them to 'get on your level'.

Every time you meet someone, your level takes a hit, but not if you shared your level first.

The longer you stay at home, the higher your level gets.

If you meet someone who travels and meets a lot of people, your level suffers.

If you enable location alerts in the app your level will improve. Location alerts do not send any data to the server, but remind you to put on a mask when you start a new journey. This can be verified by looking at the source code.

If you must share a meal with someone, aka, take off masks, you should check that they have the *same* level before you do. Please also check if the local hospitals will have enough beds in two weeks, before you take such a risk.

Anyone who meets you should get on your level, otherwise they endanger, not just you, but everyone you met for the last 2-3 weeks.


What happens if you get alerted, or are feeling sick?
---------------
If you had been sharing levels, if the neighbourhood grocer exhibits symptoms two weeks from now, you will get an alert. They will remain anonymous, unless they want to share some identifying information.

There are two flavors to these alerts.
One is to exercise caution, where they are feeling sick and waiting for a test. And so, you must assume you have it, and self-quanrantine. We intend to build mechanisms to ask them in a week if they are feeling better.

In some societies, it might be safe to share some identifying information. This could be -
- Phone number of the person responsible to bring food to the patient. 
- Asking for donations to help them quarantine.
- Simply asking you to check on them.

We will ask the people they have met most often to check on them, as they are most likely to notice someone has gone missing. 

We also rely on these existing networks to tell us if the person is COVID positive, not the health authorities. 

You are defined by the company you keep.

We still need contact tracing, but it does not have to be as surgical. The tradeoff is that more people will be flagged as false positives and will have to self isolate. We know that self-isolation does not work well for families as they are not able to keep the same standard as a hospital.

As it stands, there aren't enough tests in most countries for everyone. The answer isn't to try to curb the number of people who can have tests, but so easier 'smell' tests at home, and not send people to the hospital lines where they can catch more infections, till the local governments rise to the challenge, and make safeCOVID moot. 

What is different
---------------
Apple and Google have proposed a privacy preserving way to track every human interaction and coordinate with the local health authorities on tests. But have left adoption as an exercise to the reader. Coordination with health authorities is also not straightforaward in many countries.

As you can see the main goal of the app isn't to track every interaction (e.g. we do not want to track washing hands), but to educate. When we meet someone else, what we are really sharing is their level of hygine.

This also leaves room for those who are fine with lower hygine. As long as they advertise their level to you beforehand.

Algorithm
--------
At the basic level, every time we meet someone, we get downvoted, and when we stay home, upvoted. People who meet a lot of others will correctly be downvoted more times as they are getting exposure multiple times. These are the hubs in the network.

We are basically talking about a pagerank backrub update.

When we share the uuids, we can also share the hashed score, and update each other. This does not require any central authority to calculate the score.

The update is `my_score += your_score * lambda`

Then throw in all the extras we talked about. 


Further enhancements
-------------
We can add a privacy preserving way to take a photo of your mask before you leave the house to help you check if the mask is on correctly.

There can be privacy preseving signature of person's movement via gyrosope, to make sure they don't give their phone to someone else to boose their level.

FAQ
-------
Q. - What about abuse because of X?
A. - We cannot solve all of society's ills with this. Right now, the titanic is sinking and we need to teach people how to swim, quickly. We can talk about the music later.



-----
sponsored by virevol ai
