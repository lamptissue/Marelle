<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Marelle
 */

?>

	<footer id="colophon" class="site-footer">
		<div class="site-info" id=contact>

		<p class="section-title contact-section">Contact</p>
		<p class="section-intro contact">	<?php if (get_field('subheading-en')):?>
				<span class="contact-options-main"><?php the_field('subheading-en');?></span>
				<?php endif;?></p>

		<div class="contact-options">

		<div>
			<p class="contact-options-title">Call</p>
			<?php if (get_field('call')):?>
				<span class="contact-options-main"><?php the_field('call');?></span>
				<?php endif;?>
		</div>
			<div>
			<p class="contact-options-title">Email</p>			
				<?php if (get_field('email')):?>
					<span class="contact-options-main"><?php the_field('email');?></span>
				<?php endif;?>
			</div>

			<div>
				<p class="contact-options-title">Free Consultation</p>
			<?php if (get_field('bookCall')):?>
			<a href="<?php the_field('bookCall');?>" class="contact-options-main">Book a Call</a>
			<?php endif;?>

</div>
	</div>
	<span class="copyright">&copy; <?php bloginfo('name'); ?>  <?php echo date("Y"); ?></span>

		</div><!-- .site-info -->
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>


</body>
</html>
