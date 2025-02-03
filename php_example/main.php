<?php
use \Datetime;

echo "Hello ASL"

$now = new DateTime(null, new DateTimeZone('America/New_York'));
echo $now->getTimezone();
?>
