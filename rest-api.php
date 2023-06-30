<?php
/**
 * REST API
 *
 * @package V2Cloud
 */
namespace V2Cloud\RestApi;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // disable direct access.
}

// register rest api routes.
add_action( 'rest_api_init', __NAMESPACE__ . '\register_rest_api_endpoints' );

/**
 * Register REST API endpoints.
 */
function register_rest_api_endpoints() {
	$namespace = 'v2cloud/v1';

	register_rest_route(
		$namespace,
		'/hubspot',
		[
			[
				'callback'            => __NAMESPACE__ . '\create_hubspot_contact',
				'methods'             => \WP_REST_Server::CREATABLE,
				'permission_callback' => '__return_true',
				'args'                => [
					'firstname'   => [
						'required'          => true,
					],
					'lastname'    => [
						'required' => true,
					],
					'email'       => [
						'required'          => true,
						'validate_callback' => 'is_email'
					],
					'phone'       => [
						'required'          => true,
						'validate_callback' => function( $param ) {
							$param = str_replace( [' ', '.', '-', '(', ')'], '', $param );
							return preg_match( '/^[0-9]{10,15}\z/', $phone );
						},
					],
					'company'     => [
						'required' => true,
					],
					'companysize' => [
						'required' => false,
					],
					'usecase'     => [
						'required' => true,
					],
					'promotion'   => [
						'required' => false,
					],
					'hutk'        => [
						'required' => true,
					],
					'pageurl'     => [
						'required' => true,
					],
					'pagetitle'   => [
						'required' => true,
					],
				],
			],
		]
	);

	register_rest_route(
		$namespace,
		'/access-token',
		[
			[
				'callback'            => __NAMESPACE__ . '\get_access_token',
				'methods'             => \WP_REST_Server::READABLE,
				'permission_callback' => '__return_true',
			],
		]
	);

	register_rest_route(
		$namespace,
		'/verify-email',
		[
			[
				'callback'            => __NAMESPACE__ . '\verify_email',
				'methods'             => \WP_REST_Server::CREATABLE,
				'permission_callback' => '__return_true',
				'args'                => [
					'email' => [
						'required'          => true,
						'validate_callback' => 'is_email'
					],
					'firstname' => [
						'required' => true,
					],
					'token' => [
						'required' => true,
					],
				],
			],
		]
	);
}

/**
 * Create a new HubSpot contact.
 * 
 * @param WP_REST_Request $request Request Data.
 */
function create_hubspot_contact( $request ) {

	$body_data = wp_json_encode([
		'fields' => [
			[
				'name' 			=> 'firstname',
				'value'			=> $request['firstname']
			],
			[
				'name' 			=> 'lastname',
				'value'			=> $request['lastname']
			],
			[
				'name' 			=> 'email',
				'value'			=> $request['email']
			],
			[
				'name' 			=> 'phone',
				'value'			=> $request['phone']
			],
			[
				'name' 			=> 'company',
				'value'			=> $request['company']
			],
			[
				'name' 			=> 'numemployees',
				'value'			=> isset( $request['companysize'] ) ? $request['companysize'] : '',
			],
			[
				'name' 			=> 'use_case',
				'value'			=> $request['usecase'],
			],
			[
				'name' 			=> 'i_agree_to_receive_information_about_your_products__promotions__and_awards_through_email_and_sms',
				'value'			=> (string) filter_var( $request['promotion'], FILTER_VALIDATE_BOOLEAN ),
			],
			[
				'name' 			=> 'hs_lead_status',
				'value'			=> 'register_account'
			],
		],
		'context' => [
			'hutk'      => $request['hutk'],
			'pageUri'   => $request['pageurl'],
			'pageName'  => $request['pagetitle'],
			'ipAddress' => $request['ip'],
		],
	]);

	$api_request = wp_remote_post(
		'https://api.hsforms.com/submissions/v3/integration/secure/submit/4366063/2847b4b3-71ee-4e12-877e-fb4cb98947cc',
		[
			'body' => $body_data,
			'headers' => [
				'Authorization' => 'Bearer pat-na1-b1e4ea7a-aa01-4485-b848-2b23f9bde965',
				'Content-Type'	=> 'application/json',
			],
		]
	);

	if ( is_wp_error( $api_request ) ) {
		return $api_request;
	}

	return new \WP_REST_Response( wp_remote_retrieve_body( $api_request ) , 200);
}

/**
 * Get access token.
 * 
 * @param WP_REST_Request $request Request Data.
 */
function get_access_token( $request ) {

	$auth    = base64_encode( 'NcMzEL2NUagPiI7axkFbVZ6VD3LdnPQ3pqXsOH7p' . ':' . 'lZ3aKY73Lh1xcFqFpOUQPOPGzH4Gij0AFXSY7CyRmL65G1htv0yeJJEvL26WgdQmQSgEB1iM5eanrVnQQ3dLpSJA0oXoMdTSkOr30LPWzwUSlubRI97NBCNnh1z3jCNZ' );
	$response = wp_remote_post(
		'https://dash.v2cloud.com/o/token/',
		[
			'headers' => [
				'Authorization' => 'Basic ' . $auth, 
			],
			'body' => wp_json_encode( [ 'grant_type'    => 'client_credentials' ] ),
		]
	);

	if ( is_wp_error( $response ) ) {
		return $response;
	}

	return new \WP_REST_Response( json_decode( wp_remote_retrieve_body( $response ), true ) , 200);
}

function verify_email() {
	$from         = 'V2Cloud <no-reply@v2cloud.com>';
	$to           = sprintf( '%1$s <%2$s>', $_POST['firstname'], $_POST['email'] );
	$subject      = esc_html__( 'Verify your email address - V2Cloud', 'v2cloud' );
	$content_type = 'text/html';

	$content = sprintf(
		'Hello %1$s,<br /><br />Thank you for creating your V2 Cloud account. Please use this verification code to complete your registration process <br /><b><strong style="font-size: 20px">%2$s</strong></b><br /><br />Thanks,<br />V2Cloud.',
		$_POST['firstname'],
		$_POST['token']
	);

	return new \WP_REST_Response(
		wp_mail( $to, $subject, $content, [ 'from:' . $from, 'content-type:' . $content_type, 'to:' . $to ], [] )
	);
}