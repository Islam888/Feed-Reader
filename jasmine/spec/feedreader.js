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

    //Test suite for RSS Feeds definitions
    describe('RSS Feeds', function() {

        //Test ensures that allFeeds array elements URL are defined.
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        //Test ensures that allFeeds array elements URL are defined.
        it('allFeeds feed URL are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
            });
        });

        //Test ensures that allFeeds array elements name are defined.
        it('allFeeds feed name are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
            });
        });
    });


    //Test suite for the feeds menu.
    describe('The menu', function() {
        //variable for selecting body element.
        const body = $('body');
        //variable for selecting menu icon (click event target).
        const menuIcon = $('.menu-icon-link');

        //Test ensures that menu is hidden by default.
        it('menu hidden by default', function() {
            //on loading the web page, menu is hidden by default.
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

        //Test ensures that menu changes visibility by clicking the menu icon. 
        it('menu changes visibiliy by clicks', function() {
            //spy on the menu icon for clicking event   
            spyOn(menuIcon, 'click');
            //trigger click event (open menu)
            menuIcon.trigger('click');
            expect(body.hasClass('menu-hidden')).not.toBe(true);
            //trigger click event again (close menu)
            menuIcon.trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
    });
    //Test suite for entries of the feed container.
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });
       /*Test ensures that there is at least a single entry with feed container when
        the loaFeed function is called.*/
        it('ensure there is at least a single .entry within .feed', function(done) {
            var entryLength = $('.feed .entry').length;
            expect(entryLength).toBeGreaterThan(0);
            done();
        });
    });

    //Test suite for the new feed selection.
    describe('New Feed Selection', function() {
        var initialFeed,
            newFeed;
        beforeEach(function(done) {
            loadFeed(0, function() {
                initialFeed = $('.feed').html();
                loadFeed(1, function() {
                    newFeed = $('.feed').html();
                    done();
                });
            });
        });

        //Test ensures that when a new feed is loaded content changes.
        it('new feed content changes', function(done) {
            expect(initialFeed != newFeed).toBe(true);
            done();
        });
    });
}());
