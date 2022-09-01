import {Link} from 'react-router-dom';

import './App.css';

import overview from './assets/overview.png';
import globalThrough from './assets/global_through.png';
import globalHalf from './assets/global_half.png';
import pinEditing from './assets/pin_editing.png';
import guides from './assets/guides.png';
import mirror from './assets/mirror.png';
import autolayout from './assets/autolayout.png';
import exportHalf from './assets/export_half.png';
import exportThrough from './assets/export_through.png';
import completedThrough from './assets/completed_through.jpg';
import completedHalf from './assets/completed_half.jpg';

export default function Instructions() {
	return (
		<div className="App">
			<header className="Instructions-header">
				<h1>Dovetail Generator: Instructions</h1>
				<Link to="/">&lt; Back to app</Link>
			</header>
			<div className="Instructions">
				<div className="TOC">
					<ul>
						<li><a href="#introduction">Introduction</a></li>
						<li><a href="#overview">Overview</a></li>
						<li><a href="#global_settings">Global Settings</a></li>
						<li><a href="#editing_pins">Editing Pins</a></li>
						<li><a href="#guides">Guides</a></li>
						<li><a href="#mirror">Mirroring the Design</a></li>
						<li><a href="#autolayout">Auto Layout</a></li>
						<li><a href="#export">Exporting Templates</a></li>
						<li><a href="#cutting">Cutting Procedure</a></li>
						<li><a href="#todo">Epilogue</a></li>
					</ul>
				</div>

				{/* eslint-disable-next-line */}
				<a id="introduction" />
				<h2>Introduction</h2>
				<p>
					This is a quick project I put together to layout dovetail
					templates for the Shaper Origin router.  Shaper tools
					already provides a Fusion360 file that can generate evenly
					laid out dovetails, but I wanted to make my own for a few
					reasons.
				</p>
				<ol>
					<li>
						I don't have a Windows PC or Mac handy, and didn't want
						to set up a Windows install to run Fusion360.  This
						generator runs entirely in the browser.
					</li>
					<li>
						The provided Fusion360 file can only lay out dovetails
						in evenly spaced arrangements.  This tool can produce
						template files for arbitrary layouts.  You can make
						different sized tails and pins with uneven spacing and
						even asymmetric layouts if you want.
					</li>
					<li>
						This generator creates templates for the pin boards
						in <em>both</em> possible orientations.  That means
						there's no need to flip your board in both directions
						and index against both the left and the right side.
						You can just flip your board end over end and keep
						using the same reference edge.
					</li>
					<li>
						This generator can create both half-blind and through
						dovetails.
					</li>
				</ol>
				<p>
					That being said, I still recommend watching the
					instructional video that Shaper tools put out on
					dovetail cutting, as it covers a lot of fundamentals
					and technique considerations that I won't go into
					detail about here.  You can find their video
					on <a href="https://youtu.be/56tO946iOSI">YouTube</a>.
				</p>

				{/* eslint-disable-next-line */}
				<a id="overview" />
				<h2>Overview</h2>
				<img src={overview} alt="Overview screenshot" />
				<p>
					The center of the generator interface is a preview
					of your layout.  The brown rectangle represents your
					board with its end facing up, and the dashed horizontal
					line marks the shoulder line of the dovetails.  Your view
					shows the tails board, and you'll manipulate it by adding
					and moving pins.
				</p>
				<p>
					On the left side of the preview are settings that apply to
					the entire layout and the app itself.  Underneath it you'll
					find modules that you can use to create and edit your
					design.
				</p>

				{/* eslint-disable-next-line */}
				<a id="global_settings" />
				<h2>Global Settings</h2>
				<img
					src={globalThrough}
					alt="Global settings through dovetail screenshot"
				/>
				<p>
					The global settings module lets you update settings that
					affect your design as a whole.  The first among them is the
					dovetail type selector.  This allows you to choose whether
					you want to generate templates for through or half-blind
					dovetails.
				</p>
				<p>
					Next comes the unit selector, which allows you to switch
					between mm and inches.  When you change this selection, all
					values across the entire interface will switch to your
					chosen units.
				</p>
				<ul>
					<li>
						<strong>Dovetail Diameter</strong>: Set this to the
						diameter of your dovetail cutting bit at its widest
						end.
					</li>
					<li>
						<strong>Straight Diameter</strong>: Set this to the
						diameter of the straight cutter you'll use to cut the
						pins boards.
					</li>
					<li>
						<strong>Cutter Height</strong>: Set this to the maximum
						height of the carbide cutters on your dovetail bit.
					</li>
					<li>
						<strong>Cutter Angle (deg)</strong>: Set this to the
						angle in degrees of your dovetail cutter.
					</li>
					<li>
						<strong>Material Thickness</strong>: Set this to the
						exact thickness of your material.  Note that you will
						not be able to set this value higher than the height of
						your dovetail cutter in through dovetail mode, as it
						would be impossible to cut your dovetails deep enough
						otherwise.  In half-blind mode you can use arbitrarily
						thick materials because the dovetails will be shorter
						than the material thickness.
					</li>
					<li>
						<strong>Material Width</strong>: Set this to the
						exact width of your material.
					</li>
				</ul>

				<img
					src={globalHalf}
					alt="Global settings half-blind dovetail screenshot"
				/>

				<p>
					Changing to half-blind mode alters the available options
					slightly.  The straight cutter diameter disappears, as all
					half-blind cuts are made with the dovetail cutter.  In the
					bottom-most section of the panel, a new option titled{' '}
					<strong>Dovetail Depth</strong> appears.  This is the depth
					to which your dovetails should be cut, and it is limited to
					the height of your dovetail cutter.
				</p>

				{/* eslint-disable-next-line */}
				<a id="editing_pins" />
				<h2>Editing Pins</h2>
				<img src={pinEditing} alt="Pin editing tools screenshot" />
				<p>
					Underneath the preview window, you'll find three modules for
					creating and editing pins.  Let's look at each of them from
					left to right.
				</p>
				<ul>
					<li>
						<strong>Pin Creator</strong>: The leftmost module lets
						you enter a width for new pins and click the "Add Pin"
						button to insert them into your design.  The specified
						width will be the width of your pin at its widest
						end.  New pins are automatically inserted in the
						largest opening in the design.  If you don't have enough
						space for your desired pin size, the Add button will be
						grayed out until you make room. All pins must be at
						least 0.1mm larger than the diameter of your dovetail
						cutter: this ensures that there will be room to get the
						cutter into the necessary space when cutting the tails
						board with the Origin.
					</li>
					<li>
						<strong>Pin Editor</strong>: The center module allows
						you to edit the position and size of existing pins.  To
						edit a pin with this module, first click on it to select
						it.  You can recognize the selected pin by its blue
						outline.  In addition to manually editing the position
						and size of the pin with the textboxes in this
						module, you can click and drag pins in the preview to
						reposition them.  Each dovetail mode will enforce a
						minimum space between pins.  In through mode, they must
						be at least as far apart as the diameter of your
						straight cutter to ensure that it can get in between
						them when cutting the pins board.  In half-blind mode
						they must be at least as far apart as the diameter of
						the dovetail bit at the dovetail cutting depth.
					</li>
					<li>
						<strong>Half Pins</strong>: This module allows you to
						add half pins to the edges of your board.  Simply click
						the check box to enable them and then enter your desired
						size.
					</li>
				</ul>
				<p>
					While editing pins, keep in mind that the tool will try its
					best to keep you from creating physically impossible
					configurations.  If you change global parameters that make
					your current configuration impossible (for instance, by
					increasing the width of a cutter or decreasing the width of
					the board) it will simply delete pins to rectify the
					situation.  For this reason, try to get your global settings
					established before starting in on your design.
				</p>

				{/* eslint-disable-next-line */}
				<a id="guides" />
				<h2>Guides</h2>
				<img src={guides} alt="Guide configuration screenshot" />
				<p>
					The guides module to the left of the preview allows you to
					add vertical guides to the preview, which you can use to
					align your tails with consistent spacing.  When you drag
					pins in the preview, their centers and edges will snap
					to guide lines.
				</p>
				<p>
					By default, enabling guides sets them to emanate from the
					center of the board.  This is useful for creating symmetric
					layouts, but you can also start the guides at the left or
					right edge of the board if desired.  You can also customize
					the spacing in between guide lines.  If a guide line passes
					through the center of the board, it will be marked with a
					darker black color.
				</p>

				{/* eslint-disable-next-line */}
				<a id="mirror" />
				<h2>Mirroring the Design</h2>
				<img src={mirror} alt="Design mirror screenshot" />
				<p>
					The mirror module makes it easy to create perfectly
					symmetric layouts.  The two buttons each mirror one
					side of your design to the other--either left to right
					or right to left.  If you click the left to right button
					it simply deletes all pins on the right side of the board
					and replaces them with mirrored versions of the pins on
					the left.  Likewise for the right to left button, but in
					the opposite direction.
				</p>
				<p>
					If a pin crosses the center line, or comes close enough to
					it that there wouldn't be enough empty space in the center
					of the board to permit mirroring it as two separate pins, it
					will simply be replaced with a single, centered pin that
					extends to the outer edge of the original pin.
				</p>

				{/* eslint-disable-next-line */}
				<a id="autolayout" />
				<h2>Auto Layout</h2>
				<img src={autolayout} alt="Auto layout screenshot" />
				<p>
					The auto-layout module allows you to automatically generate
					evenly spaced layouts.  The selector at the top switches
					between three different layout modes.  After selecting your
					mode and filling out the parameters, clicking the "Auto
					Layout" button will replace all of your pins with the newly
					generated layout.  Note that half-pins remain under manual
					control and will not be affected by the auto-layout.
				</p>

				<h3>Even Spacing</h3>
				<p>
					The even spacing mode offers only a single parameter: the
					number of pins to generate.  It generates a layout where
					the pins and the tails are the exact same size and evenly
					spaced across the available space.
				</p>

				<h3>Fixed Pins</h3>
				<p>
					The fixed pins mode generates layouts where the pins are
					all a specific size and the spacing between them adjusts
					to place them evenly along the available space.  You can
					set both the width of the pins (at their widest point) and
					the number of them to generate.
				</p>

				<h3>Fixed Tails</h3>
				<p>
					The fixed tails mode works the same way as the fixed pins
					mode, except you set the width and count of the tails
					instead of the pins.  The specified width will apply to the
					widest part of the tails.
				</p>

				{/* eslint-disable-next-line */}
				<a id="export" />
				<h2>Exporting Templates</h2>
				<p>
					When your design is finished, use the export module to
					download the SVG templates to load into your Origin.  The
					interface varies slightly for through and half-blind
					dovetails.
				</p>

				<h3>Through Dovetails</h3>
				<img
					src={exportThrough}
					alt="Screenshot of export module in through dovetail mode"
				/>

				<ul>
					<li>
						<strong>Anchor Position</strong>: The generated
						templates use custom anchors for alignment. In
						through dovetail mode you will use the same anchor point
						for every template, so you can use this selector to
						choose your desired anchor point position.
					</li>

					<li>
						<strong>Templates</strong>: In through dovetail mode
						there are three templates to download.  One tails
						template, which can be used for both sides of the tails
						board, and one template for each side of the pins board.
					</li>
				</ul>

				<h3>Half-blind Dovetails</h3>
				<img
					src={exportHalf}
					alt="Screenshot of export module in half-blind mode"
				/>

				<p>
					Cutting half-blind dovetails will require indexing off of
					different sides of the board for different cuts, so no
					anchor position option is included.  However, due to the
					fact that setting an offset in the Origin for the pins board
					would affect both horizontal and vertical spacing, separate
					options are provided for each while generating the
					templates.
				</p>

				<ul>
					<li>
						<strong>Glue Gap</strong>: This parameter adds the given
						amount to each side of the channels cut into the pins
						boards.  Increasing this value will result in a looser
						fit between pins and tails.
					</li>
					<li>
						<strong>Extra Depth</strong>: This parameter adds the
						given amount to the depth of the channels cut into the
						pins boards.  Increasing this value will sink the tails
						boards deeper into the pins boards, leaving the ends of
						the pins boards slightly proud so that they can be
						planed or sanded flush.  For an exact fit, set this
						value to 0.
					</li>
				</ul>

				<h3>Share</h3>
				<p>
					At the bottom of the export module in either mode, you'll
					find the Share section with a button that links to the
					current design.  This link captures the entire state of
					the tool at the time you click it, and you can use it to
					share your design with others or bookmark it to come back to
					a design later.  Keep in mind that this link changes every
					time you update your design.
				</p>

				{/* eslint-disable-next-line */}
				<a id="cutting" />
				<h2>Cutting Procedure</h2>
				<p>
					Once you've downloaded your templates, it's time to cut
					your dovetails.  I won't go <em>too</em> in-depth here, as
					this overlaps heavily with the material covered in Shaper's
					dovetail video.  Here's an abbreviated overview of the
					process with a focus on the areas where it diverges from
					using Shaper's template.
				</p>
				<p>
					The procedure is also a little bit different when cutting
					half-blind dovetails.  I'll start with an overview for
					through dovetails and then go into the specifics that
					change for half-blind.
				</p>

				<h3>Through Dovetails</h3>

				<h4>Alignment</h4>
				<p>
					To begin with, clamp one of your boards (I like to start
					with the tails board) vertically into the workstation.  Mark
					one edge of each board, and always align that edge against
					the vertical stops on your preferred side.  With your board
					in place, create a grid with its origin on the side that you
					set up against the vertical stops.  This will allow you to
					swap in each of your boards in sequence without needing to
					reset your grid.
				</p>
				<p>
					The current version of this tool only supports custom
					anchor alignment, so you'll need to make sure that your
					Origin's firmware is up to date--support for custom
					anchors was added in the Inverness firmware.  Simply set
					up a grid with its origin on the corner of the board you
					selected for your anchor and then position the template's
					custom anchor at (0, 0).  You should see the blue guide
					rectangle aligned with the top of your board.
				</p>

				<h4>Cutting the Tails</h4>
				<p>
					I like to start with the tails boards.  You can cut both
					sides of your tails board with the same template.  Just be
					sure to flip the board end over end between cuts, keeping
					the marked side against the vertical stops.  To ensure
					consistent cut depth, Z touch against the material itself
					before each cut.  You can set your depth to the thickness
					of your material for a flush fit, or increase the depth by
					a small amount for slightly proud tails and pins that you
					can sand or plane flush after gluing.  The tails board
					should be cut with a zero offset--the pins templates are
					designed to be cut with an offset as necessary for fitment.
				</p>
				<p>
					When cutting your tails, it is absolutely imperative that
					the bit not retract while embedded in the material.  If it
					does, it will destroy your tails as the wider end of the bit
					pulls up through the material.  This is covered in more
					detail in the Shaper tools video which, to reiterate, you
					should watch before attempting to cut dovetails with the
					Origin.
				</p>
				<p>
					To make the cut successfully, take advantage of the large
					empty space at the bottom of the template to plunge the bit
					away from the material.  Make sure your support bar is also
					clear of this space.  You can then proceed into the material
					to make your cuts.  Make sure that
					you <strong>always</strong> bring the bit back down to the
					bottom of the empty space in the template before retracting
					to avoid damage to your workpiece.
				</p>
				<p>
					If your pins are all narrower than twice the diameter
					of your dovetail bit, you can cut your tails boards with
					a single inside line cut around the entire template.  If
					they are wider, then you'll need to pocket the insides of
					the pin spaces first.  With both the pocket and inside line
					cuts, make absolutely certain that you plunge and retract
					at the bottom of the empty space to avoid damage to your
					tails.
				</p>

				<h4>Cutting the Pins</h4>
				<p>
					Cutting the pins is less complicated, because you can
					make your cuts with a straight bit and don't have to worry
					about destroying the workpiece with an errant
					retraction.  Do, however, be sure to change the bit size
					when switching between the two, and you'll still want
					to Z touch off of the material for accurate depth of cut.
				</p>
				<p>
					The trick to the pins boards is that you need to cut the two
					sides of each board with different templates--one with the
					A side template, one with the B side template.  When you cut
					the A side template, the side of the board facing you will
					become the inside of your box.  The primary difference
					between this procedure and the one outlined in the Shaper
					video is that <strong>you do not need to flip your tails
					boards in both directions</strong>.  Simply flip end
					over end, clamp back in place with the marked edge against
					the vertical stops, and switch to the other template.
				</p>
				<p>
					The A side template is the most difficult to cut because of
					its bottle necks at the bottom.  You will probably need to
					make separate pocket cuts for each individual tail, and for
					narrower tails you may need to make separate inside line
					cuts for each as well.  Even if they don't connect to the
					main body of the template, they should still clear out
					enough material to define your pins.  The B side is more
					straightforward to cut because you'll be cutting with the
					wider side of the tails facing you.
				</p>
				<p>
					The pins board templates are the ideal place to adjust the
					fit of your joints.  You may notice that they have open
					space above and below the workpiece: this allows you to add
					a negative offset to clear out more material without cutting
					the edges of the board.  The templates don't have any glue
					gap built in, and I've found that cutting both tails and
					pins to 0 offset results in a joint that
					just <em>barely</em> fits together.  I've been using an
					offset of -0.03mm to provide just a tiny bit of extra space
					for glue.
				</p>
				<img
					src={completedThrough}
					alt="Completed through dovetailed box"
				/>

				<h3>Half-blind Dovetails</h3>

				<h4>Alignment</h4>

				<p>
					Aligning the tails boards is similar to the through dovetail
					process, but in these templates the custom anchor positions
					are already set for you.  This is because the two sides of
					the board will need to be indexed against different sides
					of the workstation owing to the need to cut the
					rounded tails on the side facing you both times.
				</p>
				<p>
					When cutting the A side, index the left side of
					the board against the vertical stops, grid on the left side
					and align to the custom anchor.  Whichever side is facing
					towards you when you set the board up will become the inside
					of the box.  To cut the B side rotate the board like you're
					turning a steering wheel, keeping the same face towards
					you.  You'll now need to index the board against the right
					side vertical stops, grid on the right side and align to
					the custom anchor.
				</p>
				<p>
					For the pins boards, you'll want to lie the board down
					horizontally on your work surface.  For small pieces you
					may be able to get away with using the workstation, but for
					longer boards you'll need to either put shaper tape on the
					board itself or build a fixture to hold the board in
					place.  It also helps to place extra material of the same
					thickness to the sides of the board to keep the Origin
					stable while cutting.
				</p>
				<p>
					The side of the board facing up will become the inside
					of the box.  For the A side, grid on the left side of the
					board and align to the custom anchor.  For the B side, grid
					on the right side.  Keep the same face of the board facing
					up for both cuts, effectively spinning the board in place
					on the work surface.
				</p>

				<h4>Cutting the Tails</h4>

				<p>
					Cutting the tails for half-blind dovetails is essentially
					the same as for through dovetails, with the exception that
					you <strong>must</strong> make sure to set your cut depth to
					the exact <strong>Dovetail Depth</strong> setting to ensure
					proper fit in the pins board.  Don't forget to Z touch on
					your material and be sure to plunge in the open area at the
					bottom of the template.
				</p>

				<h4>Cutting the Pins</h4>

				<p>
					For the pins boards, the process is similar but you'll be
					cutting into the end grain of the board instead of across
					it.  You still want to plunge the bit in the open space at
					the bottom of the template, and use pocketing mode to clear
					out any larger cut areas before switching to inside cut
					mode.  And most importantly, <strong>use your dovetail
					cutter rather than a straight bit for these cuts.</strong>
				</p>
				<p>
					One key difference from the through dovetail templates is
					that it's not a good idea to use negative offset to adjust
					the fit.  The depth <strong>and</strong> width of the cut
					are important, and if you add a negative offset you'll
					change both of them the same amount at the same
					time.  Instead, you can use the <strong>Glue
					Gap</strong> and <strong>Extra Depth</strong> settings
					in the export module.  The first setting will adjust the
					fit of the tails in the slots, and the second will make
					the slots deeper.  I like to add a little bit of depth
					so that the ends of the pins board sit slightly proud
					of the tails boards, allowing you to plane or sand them
					flush.  If you shoot for an exact fit and end up with
					channels too shallow, you'd have to plane down the entire
					length of the tails board to get a flush fit.
				</p>

				<img
					src={completedHalf}
					alt="Completed half-blind dovetailed box"
				/>

				{/* eslint-disable-next-line */}
				<a id="todo" />
				<h2>Epilogue</h2>
				<p>
					If you've made it this far, thanks for sticking with me.  I
					built this tool for myself, but hopefully you'll find it
					useful for your projects as well.  If you find a bug, please
					let me know by filing an issue in the {' '}
					<a href="https://www.github.com/bieber/dovetails">
						Github repo
					</a>.
				</p>
				<p>
					With the addition of half blind mode, I'm considering this
					project feature complete.  I'm not planning to make any more
					additions to it in the foreseeable future, but I'll try to
					fix any bug reports that come in.  And of course if you want
					to add a new feature, I'm open to pull requests--just try to
					follow the same style as the rest of the code.
				</p>
				<p>
					P.S. Did you know that you can also use this to create
					custom box joint layouts by setting the cutter angle to 0
					and using a straight bit for both cuts?  At least I think
					you can.  I've never tried it myself, but I have looked at
					the generated templates and they seem legit enough.  You
					could even do half-blind box joints.  If you give it a try
					let me know if it works out for you!
				</p>
			</div>
		</div>
	);
}
