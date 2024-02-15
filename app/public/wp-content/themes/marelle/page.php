<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Marelle
 */

get_header();
?>
<?php $current_lang = isset($_GET['lang']) ? $_GET['lang'] : 'en'; ?>

<?php $language_field = $current_lang == 'fr' ? 'fr' : 'en';?>
<div class="intro-load"></div>

<section>
			<div class="introduction-container">
		<?php
    		if( get_field("introduction-$language_field") ):
        	the_field("introduction-$language_field");
   			 endif;?>
		</div>

		<div class="custom-cursor">
			<div class="cursor-image-container"></div>
		<p class="cursor-image-title"></p>
		</div>

		<div class="slideshow-container">
		<div class="slideshow">
			<?php $images = get_field('slideshowCursor');
			if( $images ): ?>
			<?php foreach( $images as $image ): ?>
				<div class="slide">
				<img src="<?php echo esc_url($image['sizes']['large']); ?>" alt="<?php echo esc_attr($image['alt']); ?>" />
				<div class="slide-text"><p><?php echo esc_html($image['title']); ?></p></div>
				</div>
 			<?php endforeach; ?>
			<?php endif; ?>
		</div>
			</div>
</section>

	<main id="primary" class="site-main">

		<!-- About -->
	<section id="about">
			<div class="container">
				<p class="section-title">About</p>

				<?php if( get_field("about_paragraph-$language_field")): ?>
       			<span class="intro-text"><?php the_field("about_paragraph-$language_field"); ?></span>
    			<?php endif; ?>

				<?php if( get_field("about_paragraph-main-$language_field")): ?>
				<div class="main-text"> 
				<?php the_field("about_paragraph-main-$language_field");?>
				</div>
  				<?php endif;?>

			</div>
	</section>

		<!-- Services -->
	<section id="services">
		<div class="container">
			<p class="section-title">Services</p>
			
			<?php if( get_field("services-introduction-$language_field") ):?>
			<span class="intro-text"><?php the_field("services-introduction-$language_field");?></span>
    		<?php endif;?>
			</div>
		<div class="option-container">
			<?php if( have_rows("services-$language_field") ):
    		while ( have_rows("services-$language_field") ) : the_row();

				if( get_row_layout() == 'service-option-group-title' ):
				$service = get_sub_field('service-option-title');
				echo '<h2 class="service-title">' . wp_kses_post($service) . '</h2>';
				
				echo '<div class="option-layout">';
            if( have_rows('service_option') ):
                while ( have_rows('service_option') ) : the_row();
                    $title = get_sub_field('title');
					$text = get_sub_field('description');

					echo '<div class="option-block">';
					echo '<h3 class="option-title">' . wp_kses_post($title) . '</h3>'; 
                    echo '<p class="option-text">' . wp_kses_post($text) . '</p>';
					echo'</div>';
						endwhile;
						echo'</div>';

					endif;
				endif;
			endwhile;
		endif; ?>
		</div>

<div class="container bottom">

	<?php if (get_field("conclusion-large-$language_field")):?>
	<span class="intro-text"><?php the_field("conclusion-large-$language_field");?></span>
	<?php endif;?>

	<?php if (get_field("conclusion-small-$language_field")):?>
	<div class="main-text"> 
	<?php the_field("conclusion-small-$language_field");?></div>
	<?php endif;?>
	
		<?php if (get_field('bookCall')):?>
		<a href="<?php the_field('bookCall');?>" class="book-call">Book a Call</a>
		<?php endif;?>
		</div>

	</section>

		<!-- Rates and Packages -->
	<section id="ratePackages">
		<div class="container">
		<p class="section-title">Rate & Packages</p>

		<?php if( get_field("rates-introduction-$language_field")):?>
		<span class="intro-text"><?php the_field("rates-introduction-$language_field"); ?></span>
		<?php endif;?>
		</div>

		<div class="option-container">
		<?php 
			echo '<div class="option-layout">';
		if( have_rows("rates-$language_field") ):
		while ( have_rows("rates-$language_field") ) : the_row();
			$title = get_sub_field('title');
			$text = get_sub_field('description');

			echo '<div class="option-block">';
			echo '<h3 class="option-title rates">' . wp_kses_post($title) . '</h3>'; 
			echo '<p class="option-text">' .wp_kses_post($text). '<p>';
			echo'</div>';
		endwhile;
		echo'</div>';
		endif;?>
</div>
		<div class="main-text">
    		<?php if( get_field("rates-conclusion-$language_field") ):?>
        	<?php the_field("rates-conclusion-$language_field");?>
    		<?php endif;?>
			</div>
			<?php if (get_field('bookCall')):?>
			<a href="<?php the_field('bookCall');?>" class="book-call">Book a Call</a>
			<?php endif;?>

	

	</section>

		<!-- Clients -->
	<section id="clients">
		<div class="container">

		<p class="section-title">Clients</p>
		
		<p class="section-intro">
		<?php if( get_field("clients-introduction-$language_field") ): ?>
		<?php the_field("clients-introduction-$language_field"); ?>
		<?php endif; ?>
		</p>
		</div>

<div class="option-container">
		<?php 
				echo '<div class="option-layout">';

		if( have_rows("client_testimonial-$language_field") ):

		while ( have_rows("client_testimonial-$language_field") ) : the_row();
			
			$name = get_sub_field('name');
			$testimonial = get_sub_field('testimonial');
			echo '<div class="option-block">';

			echo '<h3 class="service-title">' . wp_kses_post($name) . '</h3>'; 
			echo '<p class="option-text">' . wp_kses_post($testimonial) . '</p>';
			echo'</div>';
		endwhile;
		echo'</div>';
		endif; ?>

	</div>

		<?php if( get_field("client-conclusion-$language_field") ): ?>
		<div class="main-text-clients"><?php the_field("client-conclusion-$language_field"); ?></div>
		<?php endif; ?>

	</section>


	</main><!-- #main -->

<?php
get_footer();
