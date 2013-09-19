<?php
namespace lib\Application;

/**
 * An Application - very basic routing etc
 * @author Joshua Ross <joshualross@gmail.com>
 */
class Application
{
    const HANDLER_ERROR = 'error';

    const METHOD_GET = 'GET';
    const METHOD_POST = 'POST';
    const METHOD_PUT = 'PUT';
    const METHOD_DELETE = 'DELETE';

    /**
     * Routes
     * @var array
     */
    protected $routes = array(
    	self::METHOD_GET => array(),
    	self::METHOD_POST => array(),
    	self::METHOD_PUT => array(),
    	self::METHOD_DELETE => array(),
    );

    /**
     * Various route handlers, normally for errors
     * @var function
     */
    protected $handlers = array(
    	self::HANDLER_ERROR => null,
    );


    /**
     * Error state handler
     * scope param
     * @return lib\Application\Application
     */
    public function error($handler)
    {
        $this->handlers[self::HANDLER_ERROR] = $handler;
        return $this;
    }

    /**
     * Setup a route for put requests
     * @param string $route
     * @param function $handler
     * @return lib\Application\Application
     */
    public function put($route, $handler)
    {
        return $this->on($route, $handler, self::METHOD_PUT);
    }

    /**
     * Setup a route for get requests
     * @param string $route
     * @param function $handler
     * @return lib\Application\Application
     */
    public function get($route, $handler)
    {
        return $this->on($route, $handler, self::METHOD_GET);
    }

    /**
     * Setup a route for delete requests
     * @param string $route
     * @param function $handler
     * @return lib\Application\Application
     */
    public function delete($route, $handler)
    {
        return $this->on($route, $handler, self::METHOD_DELETE);
    }

    /**
     * Setup a route for post requests
     * @param string $route
     * @param function $handler
     * @return lib\Application\Application
     */
    public function post($route, $handler)
    {
        return $this->on($route, $handler, self::METHOD_POST);
    }

    /**
     * Add a route
     * @param string $route
     * @param function $handler
     * @param string $method
     * @return lib\Application\Application
     */
    public function on($route, $handler, $method=self::METHOD_GET)
    {
        $this->routes[$method][$route] = $handler;
        return $this;
    }

    /**
     * Run the app, parses the route then calls the handler
     *
     * @return lib\Application\Application
     */
    public function run()
    {
        //very basic route parsing
        $route  = $this->getRoute();
        $params = $this->getParams();
        $method = $this->getMethod();

        //debug logging
        error_log(json_encode(array(
            'route' => $route,
            'method' => $method,
            'params' => $params),
        JSON_UNESCAPED_SLASHES));


        //create an output buffer
        //call the route if it exists
        //fallback to error handler
        ob_start();
        if (!empty($this->routes[$method][$route])) {
            $this->routes[$method][$route]($params);

        } else if (!empty($this->handlers[self::HANDLER_ERROR])) {
            $this->handlers[self::HANDLER_ERROR]($params);
        }

        $output = ob_get_flush();
        if (empty($output))
            echo 'Nope. That didn\'t work';

        return $this;
    }

    /**
     * Parse the route from the REQUEST_URI
     *
     * @return string
     */
    protected function getRoute()
    {
        $request = $_SERVER['REQUEST_URI'];

        //separate out the query params
        if (false !== strpos($request, '?'))
            list($route, $params) = explode('?', $request, 2);
        else
            $route = $request;

        $route = rtrim($route, '/');
        return $route;
    }

    /**
     * Return the params - parsed from stdin, json decoded when applicable, merged with
     * _REQUEST params (post and get)
     *
     * @return array
     */
    protected function getParams()
    {
        //get the params from the put/delete/post
        $params = file_get_contents("php://input");
        if (isset($_SERVER['CONTENT_TYPE']) && $_SERVER['CONTENT_TYPE'] == 'application/json')
            $params = json_decode($params, true);

        if (!is_array($params))
            $params = array();

        $params = array_merge($params, $_REQUEST);

        if (empty($params)) {
            $params = array();
        };

        return $params;
    }

    /**
     * Return the request method
     *
     * @return string
     */
    protected function getMethod()
    {
        return $_SERVER['REQUEST_METHOD'];;
    }
}