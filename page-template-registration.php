<?php /* Template Name: Customer Registration - 2023 */ ?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
<?php
	elegant_description();
	elegant_keywords();
	elegant_canonical();

	/**
	 * Fires in the head, before {@see wp_head()} is called. This action can be used to
	 * insert elements into the beginning of the head before any styles or scripts.
	 *
	 * @since 1.0
	 */
	do_action( 'et_head_meta' );

	$template_directory_uri = get_template_directory_uri();
?>

	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />

	<script type="text/javascript">
		document.documentElement.className = 'js';
	</script>

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

<?php wp_body_open(); ?>

	<div id="page-container">

		<div id="main-content">

			<div id="content-area" class="clearfix">
				<article id="post-<?php get_the_ID(); ?>" <?php post_class(); ?>>
					<div class="entry-content">
						<div id="root"></div>
					</div>
				</article>
			</div>

		</div>

		<script src="<?php echo esc_url( get_stylesheet_directory_uri() . '/registration/dist/bundle.js' ); ?>" defer async></script>

<?php
/**
 * Fires after the main content, before the footer is output.
 *
 * @since 3.10
 */
do_action( 'et_after_main_content' );

if ( 'on' === et_get_option( 'divi_back_to_top', 'false' ) ) : ?>

	<span class="et_pb_scroll_top et-pb-icon"></span>

	<?php endif; ?>

	</div>

<?php wp_footer(); ?>
</body>
</html>
