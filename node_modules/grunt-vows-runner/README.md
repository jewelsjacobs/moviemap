##grunt-vows-runner

[![Build Status](https://travis-ci.org/goalzen/grunt-vows-runner.png?branch=master)](https://travis-ci.org/goalzen/grunt-vows-runner)

An alternative test-runner for vows using [grunt](http://gruntjs.com/).

###Philosophy

File and directory matching, file watching, coverage reporting, etc. should be supplied by third-party tools where possible.
Grunt is a great source of such third-party-tools.  These are much more likely to continue development than the equivalent
tools built into vows, since they are used by many other packages as well.

###Additions

With grunt-vows-runner you can

* Use grunt [targets](http://gruntjs.com/configuring-tasks#task-configuration-and-targets) and
[templates](http://gruntjs.com/configuring-tasks#templates).
* Run suites in the same target concurrently.
* Set different options for each target.
* Have each target output to a different file (or the console).
* Disable groups of tests at the target level.

###Differences from the vows command-line runner

* Use grunt to specify which [files](http://gruntjs.com/configuring-tasks#files) to run.
* Use grunt's ``watch`` task.
* No shuffle option (if you want this, let me know--it is easy to implement).
* No built-in js-coverage support.
 * I highly recommend [istanbul](https://github.com/yahoo/istanbul), which does not need the cooperation of the test-runner
 (simply ``istanbul cover bin/vows`` will work ); and it is written in javascript, not java.
* No 'isolate' option.  If your system-under-test uses process.cwd, process.argv, or process.exit,
it is best to create a [child process](http://nodejs.org/api/child_process.html) in the test topic.

###Installation

1. Change directories to the root directory of your project
2. ``npm install grunt-vows-runner``
3. Add the following line to your ``Gruntfile.js``

```javascript
grunt.loadNpmTasks('grunt-vows-runner');
```

###Configuration

Configuration is placed in the ``grunt.initConfig`` section of your ``Gruntfile.js`` file in the ``vows`` object.

``vows`` is a [multitask](http://gruntjs.com/creating-tasks#multi-tasks).

Each target references one or more source files containing suites and may contain options which will be applied to all of those
suites.

An example ``vows`` configuration with two targets:

    ...
    vows : {
      all : {
        src : "<%= allTests %>",
        options : {
          reporter : "spec"
        }
      },
      allXunit : {
        src : "<%= allTests %>",
        dest : "testResults.xml"
        options : {
          reporter : "Xunit"
        }
      }
    },
    allTests : "tests/*"
    ...

The example above uses the [_compact format_ for specifying files](http://gruntjs.com/configuring-tasks#compact-format)
as well as [templates](http://gruntjs.com/configuring-tasks#templates).

One destination file (``dest``) can be specified per target.  It will contain the output of all the suites in the target.  If no
destination file is specified, the output will go to the console.

Paths for both source and destination files are relative to the location of ``Gruntfile.js``.

Results are summed by target.  Grunt-vows-runner doesn't combine the results of multiple targets.

Suites within a target are run concurrently; faster suites will finish first.  Targets in grunt are always run sequentially.

####Options

Options can be placed at the task (``vows``), target, or suite level.

Here is an example of each:

_Gruntfile.js_ (task- and target-level options) -- the reporter is set at the task-level

    ...
    vows : {
      options : {
        reporter : "spec"
      },
      most : {
        src : ["test/*", "!test/errorTests.js"]
      },
      error : {
        src : "test/errorTests.js",
        options : {
          error : false
        }
      }
    }
    ...

_test/errorTests.js_ (suite-level options) -- this is a different way to accomplish the same as above

    ...
    vows.describe('Error Handling').addBatch({
    ...
    }).export(module, {error : false});
    ...

The following options are available:

* ``error``
 * Whether or not vows should handle errors in topics for you.  Set ``error : false`` if you want to handle your own errors.
 The first argument to your vows will be reserved for errors.
* ``reporter``
 * [See the list of reporters](#reporters)
* ``matcher``
 * a javascript [RegExp object](http://www.w3schools.com/jsref/jsref_obj_regexp.asp); only run tests whose titles match this
 object.
* ``disabled``
 * Temporarily disable tests for a target.

####Reporters<a id="reporters"/>

From grunt-vows-runner:

* spec
* xunit
  * Produces output meant for [Jenkins CI](http://jenkins-ci.org/). It tries to divide the tests into a hierarchy of levels
   for easier navigation in the Jenkins test report.
  * Use the colon (':') character to separate levels.  For example if you had a topic (or a subtopic,
   or combination) that looked like this:

        ``Monkeys: grooming``

        then there would be a "Monkeys" folder in Jenkins with a "grooming" folder inside of it, containing the test results.

From [vows](https://github.com/cloudhead/vows/tree/master/lib/vows/reporters)

* tap
* dot-matrix
* json

Request any other reporters [here](https://github.com/goalzen/grunt-vows-runner/issues)

###Command-Line Options

grunt-vows-runner incorporates the following grunt command-line options, if present:

* ``--no-color``
* ``--verbose``

###Bugs, etc.

Please report any bugs, feature requests, etc. to [grunt-vows-runner's github issue tracker](https://github.com/goalzen/grunt-vows-runner/issues).

