<?php
/*
 * This file does some basic setup used for all the php processes
 */
define('__BASE__', __DIR__ . DIRECTORY_SEPARATOR);
set_include_path(__BASE__ . PATH_SEPARATOR . get_include_path());
ini_set('error_reporting', E_ALL);
ini_set('error_log', __BASE__ . 'log' . DIRECTORY_SEPARATOR . 'error.log');

require_once __BASE__ . 'vendor' . DIRECTORY_SEPARATOR . 'autoload.php';
//simple app autoloader -> switch to PSR-0
spl_autoload_register(function($class) {
    $filename = __BASE__ . str_replace('\\', DIRECTORY_SEPARATOR, $class) . '.php';
    if (file_exists($filename))
    {
        include($filename);
        return true;
    }
});
