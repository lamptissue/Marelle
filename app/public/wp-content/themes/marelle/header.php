<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Marelle
 */
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e('Skip to content', 'marelle'); ?></a>

	<header id="masthead" class="site-header">

		<div class="language-select">       
		<?php $current_lang = isset($_GET['lang']) ? $_GET['lang'] : 'en';?>
		<?php $language_field = $current_lang == 'fr' ? 'fr' : 'en';?>

		<a href="?lang=en" class="<?php echo $current_lang == 'en' ? 'selected-language en' : ''; ?>">EN</a> 
		<a href="?lang=fr" class="<?php echo $current_lang == 'fr' ? 'selected-language fr' : ''; ?>">FR</a>
		</div>

		<h1 class="site-name-animation"><?php bloginfo('name'); ?></h1>

		<div class="site-branding">
		<h1>
			<a href="#page" class="site-name">
			<?php bloginfo('name'); ?>
			</a>
		</h1>
		</div>	

		<div class="availability"> 
			<span>notice</span>
				<?php if( get_field("availability-$language_field")): ?>
       			<span><?php the_field("availability-$language_field"); ?></span>
    			<?php endif; ?>
				<div class="availability-close-box">
				<span class="availability-close">close</span>
				</div>
		</div>
		
		<div class="header-nav"> 
			<nav id="site-navigation" class="main-navigation">
				<?php wp_nav_menu([
       				'theme_location' => 'menu-1',
       				'menu_id' => 'primary-menu',
   				]); ?>
			</nav>
		</div>

	</header>
