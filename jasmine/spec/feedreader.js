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


        /* Testing that the url and name of each feed is defined
         * in the allFeeds object
         */
         it('URL is defined', function() {
           /* loops thru allFeeds and checks that the value of the
            * url key is defined
            */
           for (let index of allFeeds) {
             expect(index.url).toBeDefined();
             expect(index.url.length).not.toBe(0);
           }
         });

         it('name is defined', function() {
           /* loops thru allFeeds and checks that the value of the
            * name key is defined
            */
           for (let index of allFeeds) {
             expect(index.name).toBeDefined();
             expect(index.name.length).not.toBe(0);
           }
         });
    });


    /* Testing that the menu is hidden by default and that
     * clicking the menu button toggles its visibility
     */
    describe('The menu', function() {

         it('is hidden by default', function() {
           // gets the body object in the DOM
           const body = document.querySelector('body');
           // checks if the menu-hidden class is attached to the body
           expect(body.classList.contains('menu-hidden')).toBe(true);
         });

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

    /* Testing that entries are actually loading when loadfeed()
     * is called
     */
    describe('Initial Entries', function() {
         // waits for feed to be loaded
         beforeEach(function(done) {
           loadFeed(0, done);
         });

         // checks that there is more than 0 entries within the feed
         it('are loaded', function() {
           const feed = document.querySelector('.feed');
           expect($('.feed .entry').length > 0).toBe(true);
         });
    });

    /* Testing that the feeds are different after loadfeed is called */
    describe('New Feed Selection', function() {
         // get feed outside of functions so it can be used in all functions
         const feed = document.querySelector('.feed');
         // array to hold content of loadFeed(0)
         let firstFeed = [];
         // saving content of 1st feed into array and then loading 2nd feed
         beforeEach(function(done) {
           loadFeed(0, function() {
             Array.from(feed.children).forEach(function(entry) {
               firstFeed.push(entry.innerHTML);
             });
             loadFeed(1, done);
           });
         });
         // using array to loop thru 2nd feed and then compare it to 1st
         it('content changes', function() {
           Array.from(feed.children).forEach(function(entry,index) {
             expect(entry.innerHTML === firstFeed[index]).toBe(false);
           });
         });
    });
}());
