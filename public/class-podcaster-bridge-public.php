<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://www.podcaster.de
 * @since      1.0.0
 *
 * @package    Podcaster_Bridge
 * @subpackage Podcaster_Bridge/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Podcaster_Bridge
 * @subpackage Podcaster_Bridge/public
 * @author     Fabio <bridge@podcaster.de>
 */
class Podcaster_Bridge_Public {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Podcaster_Bridge_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Podcaster_Bridge_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/podcaster-bridge-public.css', [], $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Podcaster_Bridge_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Podcaster_Bridge_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/podcaster-bridge-public.js', ['jquery'], $this->version, false );

	}

    // [podcaster-podcasts]
    public function shortcode_podcasts($atts) {
        $filtered = shortcode_atts([
            'title' => 'Meine Podcasts',
            'titleclass' => 'podcaster-podcasts-header',
            'listclass' => 'podcaster-podcasts-list',
            'listitemclass' => 'podcaster-podcasts-list-item',
            'uselink' => true,
            'shownofeedsmessage' => true,
            'nofeedsmessage' => 'Es sind keine Podcasts vorhanden.', // TODO: I18N
            'nofeedsclass' => 'podcaster-no-feeds',
        ], $atts, 'podcaster-podcasts');

        foreach (['uselink', 'shownofeedsmessage'] as $bool) {
            $filtered[$bool] = filter_var( $filtered[$bool], FILTER_VALIDATE_BOOLEAN );
        }

        $output = '<div class="clear"></div>';
        $output .= '<div class="">';
        $output .= "<h3 class=\"{$filtered['titleclass']}\">{$filtered['title']}</h3>";

        $aPodcastList = [
            'https://beispiel.podcaster.de/feed.rss' => 'Beispiel-Podcast',
        ]; // TODO: Fetch from cached data source
        if (count($aPodcastList) > 0) {
            foreach($aPodcastList as $link => $title) {
                $output .= "<ul class=\"{$filtered['listclass']}\">";
                $output .= "<li class='{$filtered['listitemclass']}'>";
                if ($filtered['uselink']) {
                    $output .= "<a href='{$link}' onclick='window.open(this.href); return false;' title='Podcast öffnen'>";
                }
                $output .= "{$title}";
                if ($filtered['uselink']) {
                    $output .= "</a>";
                }
                $output .= "</li>";
                $output .= "</ul>";
            }
        } else {
            if ($filtered['shownofeedsmessage']) {
                $output .= "<div class='{$filtered['nofeedsclass']}'>{$filtered['nofeedsmessage']}</div>";
            }
        }
        $output .= "</div>";

        return $output;
    }

    // [podcaster-episodes ]
	public function shortcode_episodes($atts) {
        $filtered = shortcode_atts([
            'title' => 'Podcast',
            'titleclass' => 'podcaster-episodes-header',
            'showfeed' => true,
            'feedtitle' => null,
            'feediconclass' => 'dashicons dashicons-rss',
            'postscounttitle' => '%s Folgen',
            'postscountclass' => null,
            'showpostscount' => true,
            'shownopostsmessage' => true,
            'nopostsmessage' => 'Es liegen keine Beiträge vor.',
            'nopostsclass' => 'podcaster-no-posts',
            'clearclass' => 'clear',
            'outercontainerclass' => 'childs grid_12',
            'parent' => 8,
            'type' => 'page',
            'perpage' => 4,
        ], $atts, 'podcaster-episodes');

        foreach (['showfeed', 'showpostscount', 'showpostscount'] as $bool) {
            $filtered[$bool] = filter_var( $filtered[$bool], FILTER_VALIDATE_BOOLEAN );
        }

        $output = "<div class='{$filtered['clearclass']}'></div>";
        $output .= "<div class='{$filtered['outercontainerclass']}'></div>";
        $output .= "<h3 class='{$filtered['titleclass']}'>{$filtered['title']}";
        if ($filtered['showfeed']) {
            $output .= " <a href=''  onclick='window.open(this.href); return false;'><span class='{$filtered['feediconclass']}'></span>{$filtered['feedtitle']}</a>";
        }
        $output .= "</h3>";
        $args = [
            'post_parent' => $filtered['parent'], // default: 8
            'post_type' => $filtered['type'], // default: page
            'posts_per_page' => $filtered['perpage'], // default: 4
            'sort_column'   => 'menu_order'
        ];
        $query = new  WP_Query( $args );

        if ($filtered['showpostscount']) {
            $output .= "<div class='{$filtered['postscountclass']}'>" . sprintf($filtered['postscounttitle'], $query->post_count) . "</div>";
        }
        if ($query->post_count > 0) {
            while ($query->have_posts()) : $query->the_post();
                $output .= '<div id="service-hp">' .
                    get_the_post_thumbnail('home-thumb') .
                    '<h4 style="margin-bottom:5px">' .
                    get_the_title() .
                    '</h4>' .
                    get_the_excerpt() .
                    '<a class="read-more" href="' .
                    get_permalink() .
                    '">Mehr <img src="' .
                    get_bloginfo('template_url') .
                    '/images/read-more.png"></a></div><!--  ends here -->';
            endwhile;
        } else {
            if ($filtered['shownopostsmessage']) {
                $output .= "<div class='{$filtered['nopostsclass']}'>{$filtered['nopostsmessage']}</div>";
            }
        }
        wp_reset_query();
        $output .= '</div>';

        return $output;
    }
}