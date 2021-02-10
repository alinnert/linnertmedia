$noDraft = if ($args -match "--no-drafts") {
  ""
} else {
  "-D"
}
$net = if ($args -match "--net") {
  "--bind 192.168.0.12 --baseURL http://192.168.0.12:1313"
} else {
  ""
}

Invoke-Expression "hugo server $noDraft $net"
