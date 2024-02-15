<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'local' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'root' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          '#Rt^Ij&}Mn#j><~]{mIkrah SJu?)}y0YM?[cY~g]&~JI)Z)X`%8DW0UuBJOvj5]' );
define( 'SECURE_AUTH_KEY',   'az?9Y))p},Rg89&#`;mV12IH}hmm72?o{U6 xQS: 6hn/#DzHSn8OSiXy@Z]+=F_' );
define( 'LOGGED_IN_KEY',     'OZ]CeR HGRp~U`f`b#e{ou0=hWiN^zEb7ymJCwn )Xszx*3:`/dvN#o_LV*GY8f0' );
define( 'NONCE_KEY',         '/Up7DTp8{{#y#6YBpP3BI0k>LI2`<7x|a.sOgEkqF,sd6U;x9g%^ovL^yu_XXMEL' );
define( 'AUTH_SALT',         '=Rgfc^6<E#xH6*g,},ib|IN<k>8<iAhbx}909|R|vRMOdEQ3eb)% DdvL.6f#toV' );
define( 'SECURE_AUTH_SALT',  ']p/)Z]dh$]OY4Cy(+D.^Uban4#?q-$#~s-?i%<`GtGPx59ESwNB|I5Rt;f9rpjL`' );
define( 'LOGGED_IN_SALT',    'CW}<D=:9E|sSN=Sl(^&[CJ8|hev(~9onKZ4rZj0am,4m]_*i} Q@-[:Zly-^MVP&' );
define( 'NONCE_SALT',        'LMtYb:zH2b,ouTA]z8-y{i.JvX{ & ^YU_Qvx#>&.px%O,;e/8/jSnRtKhQGdn[7' );
define( 'WP_CACHE_KEY_SALT', 'nMrTahR1QO<<y;@xEGwnw2i*6t&k]B@_ehl^N}&$B~`0uGL$_%4eUiLVO,VfdCp+' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


/* Add any custom values between this line and the "stop editing" line. */



/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

define( 'WP_ENVIRONMENT_TYPE', 'local' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
