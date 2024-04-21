<?php


function getPDO() {
	$host= 'php-postgres';
	$db = 'db';
	$user = 'user';
	$password = 'password';
	try {
		$dsn = "pgsql:host=$host;port=5432;dbname=$db;";
		$pdo = new PDO($dsn, $user, $password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
	
		if ($pdo) {
			return $pdo;
		}
		return null;
	} catch (PDOException $e) {
		die($e->getMessage());
	} 
	
}
if (isset($_SERVER['HTTP_ORIGIN'])) {
    // Decide if the origin should be allowed
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    exit(0);
}
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$requestUri = $_SERVER['REQUEST_URI'];

$endpoint = ltrim(str_replace('index.php', '', $requestUri), '/');

// Handle different endpoints
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        switch ($endpoint) {
            case 'hello_world':
                $response = [
                    'message' => 'Hello, World! (GET)'
                ];
                echo json_encode($response);
                break;
            default:
                http_response_code(404);
                echo json_encode(['error' => 'Endpoint Not Found']);
        }
        break;
    case 'POST':
        switch ($endpoint) {
            case 'register':
                try{
                    $data = json_decode(file_get_contents('php://input'), true);
                    $username = isset($data['username']) ? $data['username'] : null;
                    $getpassword = isset($data['password']) ? $data['password'] : null;
                    $password = password_hash($getpassword, PASSWORD_DEFAULT);
                    $type = isset($data['type']) ? $data['type'] : null;
                    $level = isset($data['level']) ? $data['level'] : null;
                    $pdo = getPDO();
                    if($type == "admin"){
                        $check = "SELECT * FROM admin WHERE username = ?";
                        $stmt2 = $pdo->prepare($check);
                        $stmt2->execute([$username]);
                        $data = $stmt2->fetchAll(PDO::FETCH_ASSOC);
                        if($data!==[]){
                            echo json_encode(["message"=> "error"]);
                        }
                        else{
                            $query = "INSERT INTO admin (username, password) VALUES (?, ?)";
                            $stmt = $pdo->prepare($query);
                            $stmt->execute([$username, $password]);
                            $response = [
                                'message' => 'Registration Successful!'
                            ];
                            echo json_encode($response);
                        }
                    }
                    else{
                        $check = "SELECT * FROM approver WHERE username = ?";
                        $stmt2 = $pdo->prepare($check);
                        $stmt2->execute([$username]);
                        $data = $stmt2->fetchAll(PDO::FETCH_ASSOC);
                        if($data!==[]){
                            echo json_encode(["message"=> "error"]);
                        }
                        else{
                            $query = "INSERT INTO approver (username, password, level) VALUES (?, ?, ?)";
                            $stmt = $pdo->prepare($query);
                            $stmt->execute([$username, $password, $level]);
                            $response = [
                                'message' => 'Registration Successful!'
                            ];
                            echo json_encode($response);
                        }
                    }
                }
                catch (PDOException $e) {
                    http_response_code(500);
                    echo json_encode(['error'=> $e->getMessage()]);
                }
                break;
            case 'login':
                try{
                    $data = json_decode(file_get_contents('php://input'), true);
                    $username = isset($data['username']) ? $data['username'] : null;
                    $getpassword = isset($data['password']) ? $data['password'] : null;
                    $type = isset($data['type']) ? $data['type'] : null;
                    $pdo = getPDO();
                    $query = "SELECT * FROM approver WHERE username = ?";
                    $query2 = "SELECT * FROM admin WHERE username = ?";
                    if($type == "admin"){
                        $stmt2 = $pdo->prepare($query2);
                        $stmt2->execute([$username]);
                        $response2 = $stmt2->fetch(PDO::FETCH_ASSOC);
                        if($response2!==false){
                            $verify = password_verify($getpassword, $response2['password']);
                            if ($verify) {
                                $response = [
                                    'message'=> 'Login Successful!',
                                    'id'=> $response2['id'],
                                    ];
                                    echo json_encode($response);
                            } else {
                                echo json_encode(['message'=> 'error']);
                            }
                        }
                        else{
                            echo json_encode(['message'=> 'error']);
                        }
                    }
                    else{
                        $stmt = $pdo->prepare($query);
                        $stmt->execute([$username]);
                        $response = $stmt->fetch(PDO::FETCH_ASSOC);
                        if($response!==false){
                            $verify = password_verify($getpassword, $response['password']);
                            if ($verify) {
                                $response = [
                                    'message'=> 'Login Successful!',
                                    'id'=> $response['id'],
                                    'level'=> $response['level']
                                    ];
                                    echo json_encode($response);
                            } else {
                                echo json_encode(['message'=> 'error']);
                            }
                        }
                        else{
                            echo json_encode(['message'=> 'error']);
                        }
                    }
                }
                catch (PDOException $e) {
                    echo json_encode(['error'=> $e->getMessage()]);
                }
                break;
            default:
                echo json_encode(['error' => 'Endpoint Not Found']);
        }
        break;
    default:
        echo json_encode(['error' => 'Method Not Allowed']);
}