import {Link} from 'react-router-dom';

import './App.css';

import overview from './assets/overview.png';
import global from './assets/global.png';
import pinEditing from './assets/pin_editing.png';
import guides from './assets/guides.png';
import exportTemplates from './assets/export.png';
import pinsA from './assets/pins_a.png';
import placement from './assets/placement.jpg';
import completed from './assets/completed.jpg';

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
						<li><a href="#export">Exporting Templates</a></li>
						<li><a href="#cutting">Cutting Procedure</a></li>
						<li><a href="#todo">TODO</a></li>
					</ul>
				</div>

				{/* eslint-disable-next-line */}
				<a name="introduction" />
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
				<a name="overview" />
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
				<a name="global_settings" />
				<h2>Global Settings</h2>
				<img src={global} alt="Global settings screenshot" />
				<p>
					The global settings module lets you update settings that
					affect your design as a whole.  The first among them is the
					unit selector, which allows you to switch between mm and
					inches.  When you change this selection, all units across
					the entire interface will switch to your chosen units.
				</p>
				<ul>
					<li>
						<strong>Dovetail Diameter</strong>: Set this to the
						diameter of your dovetail cutting bit at its widest
						end.
					</li>
					<li>
						<strong>Straight Diameter</strong>: Set this to the
						diameter of the straight cutter you'll us to cut the
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
						your dovetail cutter, as it would be impossible to cut
						your dovetails deep enough otherwise.
					</li>
					<li>
						<strong>Material Width</strong>: Set this to the
						exact width of your material.
					</li>
				</ul>

				{/* eslint-disable-next-line */}
				<a name="editing_pins" />
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
						reposition them.  Note that pins must be spaced at least
						the distance of your straight cutter bit apart to ensure
						that you will be able to physically fit the bit in
						between them to cut out your pins.
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
				<a name="guides" />
				<h2>Guides</h2>
				<img src={guides} alt="Guide configuration screenshot" />
				<p>
					The guides module to the left of the preview allows you to
					add vertical guides to the preview, which you can use to
					align your tails with consistent spacing.  When you drag
					tails in the preview, their centers and edges will snap
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
				<a name="export" />
				<h2>Exporting Templates</h2>
				<img src={exportTemplates} alt="Export screenshot" />
				<p>
					When your design is finished, use the export module to
					download the SVG templates to load into your Origin.  There
					are three templates required: one for the tails boards, and
					two for the pins boards.  Click the buttons at the bottom of
					the module to download each one.
				</p>
				<p>
					The outer guide buffer is used to help align your template
					on the Origin.  In the generated file, you will find two
					blue guide paths: one rectangle that should cover the end
					of your board, and one bigger rectangle that extends the
					given distance beyond your board.  See, for example, this
					template for a pins board.
				</p>
				<img src={pinsA} alt="Example pins board template" />
				<p>
					In this example, I set the outer buffer 20mm away from
					the edges of my stock.  I subsequently used those dimensions
					to align the template (more on this in the next section).
				</p>

				<h3>Custom Anchor Points</h3>
				<p>
					If you have Origin firmware Inverness or newer, you should
					see a custom anchor point in the templates defined by the
					small red triangle.  Simply align this anchor point with the
					origin of your grid and you're ready to cut.  You can use
					the Anchor Position selector to place this at the corner of
					your stock that you intend to probe your grid at.
				</p>

				<h3>Share</h3>
				<p>
					At the bottom of the export module, you'll find the Share
					section with a button that links to the current
					design.  This link captures the entire state of the tool
					at the time you click it, and you can use it to share
					your design with others or bookmark it to come back to
					a design later.  Keep in mind that this link changes every
					time you update your design.
				</p>

				{/* eslint-disable-next-line */}
				<a name="cutting" />
				<h2>Cutting Procedure</h2>
				<p>
					Once you've downloaded your templates, it's time to cut
					your dovetails.  I won't go <em>too</em> in-depth here, as
					this overlaps heavily with the material covered in Shaper's
					dovetail video.  Here's an abbreviated overview of the
					process with a focus on the areas where it diverges from
					using Shaper's template.
				</p>

				<h3>Alignment</h3>
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
					To align each template, set its anchor point to the same
					corner as your grid origin and then place it beyond the
					origin in each axis by the amount you set for the outer
					buffer.  For example, in the image below I set my buffer
					to 20mm and created my grid with its origin at the bottom
					left of my workpiece.  So I used the bottom left anchor
					point on the template and placed it at (-20, -20) to
					perfectly align it with my workpiece.  If your template is
					aligned properly, you should see the inner blue guide placed
					directly over top of your workpiece.
				</p>
				<img src={placement} alt="Template placement example" />

				<h3>Cutting the Tails</h3>
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

				<h3>Cutting the Pins</h3>
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
				<img src={completed} alt="Completed dovetailed box" />

				{/* eslint-disable-next-line */}
				<a name="todo" />
				<h2>TODO</h2>
				<p>
					If you've made it this far, thanks for sticking with me.  I
					built this tool for myself, but hopefully you'll find it
					useful for your projects as well.  If you find a bug, please
					let me know by filing an issue in the {' '}
					<a href="https://www.github.com/bieber/dovetails">
						Github repo
					</a>.  I don't have a ton of time to devote to upkeep, but
					there are a few features left that I'm still planning to
					implement in the next month or so before I stop working on
					it in earnest.  Namely:
				</p>
				<ol>
					<li>
						An auto-layout tool that will allow you to easily
						create evenly spaced layouts.
					</li>
					<li>
						A mirrored layout tool that will mirror one side
						of the layout to the other to create a perfectly
						symmetrical layout.
					</li>
					<li>
						Support for half-blind dovetails.  This is
						conceptually not too difficult, I just need to
						sit down and work out the math to get all the cut
						lengths correct one of these days.
					</li>
				</ol>
			</div>
		</div>
	);
}
