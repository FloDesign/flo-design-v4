<?php 

  $name = $_POST['postName'];
  $email = $_POST['postEmail'];
  $budget = $_POST['postBudget'];
  $text = $_POST['postMessage'];

  $to      = 'hello@flodesign.co.uk';
  $subject = 'Flo Design contact form';
  $message = 'Name: '. $name . "\n";
  $message .= 'Budget: '. $budget . "\n";
  $message .= 'Message: ' . $text;
  $headers = "From:" . $email . "\r\n" .
    "Reply-To:" . $email . "\r\n" .
    "X-Mailer: PHP/" . phpversion();

  if(mail($to, $subject, $message, $headers)){
    echo "Woohoo! You’re awesome! we’ve got your message & will be in touch shortly";
  }
  else {
    echo "Couldn't send your form at this time. Why not call us on 0113 314 2010 or email us at <a href='mailto:hello@flodesign.co.uk'>hello@flodesign.co.uk</a>";
  }
  
?>