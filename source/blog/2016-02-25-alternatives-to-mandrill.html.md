---
title:  "Alternatives to Mandrill"
description: Mandrill have announced they're upping their prices and merging with Mailchimp. Here are some alternatives to consider
img: blog_img_mandrill.jpg
date:   2016-02-25 08:02:00
tags: Thoughts
time: 5
author: Craig
---

Mandrill, the transactional email service, has announced that they are changing the software to act as an add-on for Mailchimp. From 27th April existing users will have to merge their Mandrill accounts with Mailchimp, new users will create a Mailchimp account instead of a Mandrill account from 16th March. Mandrill will be available only to paying account holders, with pricing starting at $20 for a block of 25,000 emails.

This effectively means that the price of Mandrill has doubled, having been $10 for up to 25,000 emails previously. If you're a low volume sender, particularly one who doesn't need Mailchimp integration, then it may be worth looking into one of the alternatives below:

##Mailgun

![Mailgun](/img/mailgun.jpg)

Mailgun offers a tiered pricing structure, with the first 10,000 emails being free and then $0.00050 per email for the next 500,000. As an example, if you send 25,000 emails a month, the first 10,000 would be free and then 15,000 at the next tier price; giving you a total of $7.50 for the month. Prices come down based on volume. Dedicated IP addresses can be had for an additional $59 a month. Interestingly, Laravel offers a Mailgun driver right out of the box; making them an ideal choice for app owners with low volume transactional email requirements.

[Find out more](https://www.mailgun.com/)

##Amazon SES

![Amazon SES](/img/aws.jpg)

Amazon's Simple Email Service is a service which offers 62,000 free emails when sending from an Amazon EC2 instance. If your hosting is already set up on EC2 then this service is a no-brainer. Why go elsewhere when Amazon will give you all that capacity for free? Unfortunataly, Amazon pricing can be a little tricky to get your head around. While sending the emails is free, you will still be charged for data transfer out to the internet. However, This is reasonably priced, with your first 1Gb being free. After this it costs $0.09 per GB up to 10TB. As long as the emails are optimised there should be no problem with the free tier, although it's worth keeping an eye on this extra statistic as well as the number of emails sent. SES keeps a pool of IPs for sending emails so there is no dedicated IP option, although the IP is determinable. Like Mailgun, Laravel offers an SES driver out of the box.

It's worth noting that while SES allows transactional email sending, it doesn't include a templating engine like the other alternatives and Mandrill do. This could pose a problem for those looking for an integrated campaign system. Thanks to [@michaelw90](https://twitter.com/michaelw90) for pointing that one out!

[Find out more](https://aws.amazon.com/ses/)

##Sendgrid

![Sendgrid](/img/sendgrid.jpg)

Sendgrid is very similar to Mailgun in that they offer a free tier of up to 12,000 emails/month. With this plan they also offer extensive monitoring and analytics tools. Dedicated IPs are excluded from the free plan, as is subuser management. Their paid plans start at $1, although this is for their Lite plan, which excludes many of the monitoring tools and dedicated IPs. This plan allows sending of up to 10,000 emails, making it ideal for app owners with very low volume email needs who don't need to monitor how many of those emails are opened etc. Dedicated IPs are available on the Pro plan, which starts at $79.95 for 100,000 emails.

[Find out more](https://sendgrid.com)

##Postmark

![Postmark](/img/postmark.jpg)

Postmark is a transactional email service with a very simple pricing structure. The first 25,000 emails are free. After that the cost is based on volume. Users buy credits, with 1 credit equating to 1 email sent. 1000 credits start at $1.50 and discounts are applied at 500,000; 1,000,000; 2,000,000 and 5,000,000 credits. This pricing structure is not based on a monthly cost, making it ideal for infrequent or low volume senders. Postmark don't offer dedicated IP addresses as they think they're a bad idea. Their reasoning can be read [on their blog](https://postmarkapp.com/blog/the-false-promises-of-dedicated-ips)

##In summary

Each of the providers mentioned above have robust APIs, allowing developers to integrate apps in with each service. Mandrill remains a good product and its integration with Mailchimp will allow existing paid account holders some degree of streamlining with their campaign workflow. However, for those with low volume or infrequent email needs, it may push the price of doing business with Mailchimp beyond what they're willing to pay.