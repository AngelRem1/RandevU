<?PHP
  // form handler
  if($_POST && isset($_POST['arcade_name'], $_POST['arcade_address'], $_POST['arcade_hours'])) {

    $name = $_POST['arcade_name'];
    $address = $_POST['arcade_address'];
    $hours = $_POST['arcade_hours'];

    if(!$name) {
      $errorMsg = "Please enter your Name";
    } elseif (!$address) {
      $errorMsg = "Please enter a valid address";
    } elseif(!$hours) {
      $errorMsg = "Please enter the hours of the arcade";
    } else {
      // send email and redirect
      $to = "Bringretrotoyou@gmail/com";
      if(!$subject) $subject = "Arcade Location";
      $headers = "From: webmaster@example.com" . "\r\n";
      mail($to, $name, $address, $hours);
      exit;
    }

  }
?>