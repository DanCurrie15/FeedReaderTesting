/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('URL is defined', function() {
           /* loops thru allFeeds and checks that the value of the
            * url key is defined
            */
           for (let index of allFeeds) {
             expect(index.url).toBeDefined();
           }
         });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('name is defined', function() {
           /* loops thru allFeeds and checks that the value of the
            * name key is defined
            */
           for (let index of allFeeds) {
             expect(index.name).toBeDefined();
           }
         });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('is hidden by default', function() {
           // gets the body object in the DOM
           const body = document.querySelector('body');
           // checks if the menu-hidden class is attached to the body
           expect(body.classList.contains('menu-hidden')).toBe(true);
         });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('toggles visible to hidden', function() {
            const body = document.querySelector('body');
            // gets the button that opens/closes the menu
            const menu = document.querySelector('.menu-icon-link');
            // clicks menu icon and checks if it is visible
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            // clicks menu icon again and checks if it is hidden
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
          });

    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         // waits for feed to be loaded
         beforeEach(function(done) {
           loadFeed(0, done);
         });

         // checks that there is more than 0 text within the feed
         it('are loaded', function() {
           const feed = document.querySelector('.feed');
           expect(feed.innerText.length > 0).toBe(true);
         });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         // get feed outside of functions so it can be used in all functions
         const feed = document.querySelector('.feed');
         // array to hold content of loadFeed(0)
         let firstFeed = [];
         // saving content of 1st feed into array and then loading 2nd feed
         beforeEach(function(done) {
           loadFeed(0, function() {
             Array.from(feed.children).forEach(function(entry) {
               firstFeed.push(entry.innerText);
             });
           });

           loadFeed(1, done);
         });
         // using array to loop thru 2nd feed and then compare it to 1st
         it('content changes', function() {
           Array.from(feed.children).forEach(function(entry,index) {
             expect(entry.innerText === firstFeed[index]).toBe(false);
           });
         });
    });
}());
