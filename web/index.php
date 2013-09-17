<?php
require '..' . DIRECTORY_SEPARATOR . 'bootstrap.php';

use lib\Application\Application;

/**
 * Application
 */


//load the app lib
$app = new Application();

$loader = new Twig_Loader_Filesystem(__BASE__ . 'web' . DIRECTORY_SEPARATOR . 'view');
$twig = new Twig_Environment($loader/*, array(
    'cache' => __BASE__ . 'cache',
)*/);

$app->error(function() use ($twig){
    //render twig error page

    echo $twig->render('error.twig');
});


$app->on('', function($params) use($twig) {

    echo $twig->render('index.twig', $params);

});



$app->run();
