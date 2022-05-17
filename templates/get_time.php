<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Manage files in examtimer module instance
 *
 * @package   Get time
 * @copyleft 2022 Debonair Training {@link http://debonairtraining.com Abbas Umaru}
 * @copyright 2010 Dongsheng Cai <dongsheng@moodle.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

require('../../../config.php');
global $DB;

//get the id passed from the timer mustache
$id = $_POST['id'];

//used the id to fetch the course ID
$result = $DB->get_record_select('course_modules','id=?', array($id));
$course_id = $result->course;

//used the course ID to get the time set
$timer = $DB->get_record_select('examtimer','course=?', array($result->course));
$examtimer = $timer->duedate;
echo date('r',$timer->duedate);

 exit();


?>
