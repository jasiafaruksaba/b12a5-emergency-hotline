
1. What is the difference between **getElementById, getElementsByClassName, and querySelector / querySelectorAll**?
=>These three methods in JavaScript are ways to find HTML elements on a webpage, but they use different search criteria and return different results.

* Single Element Selection
(a) getElementById('idName'): This is the most direct way to select a single element because it uses the element's unique id attribute (e.g., <div id="main">). Because IDs are meant to be unique on a page, this method is the fastest and will return only one element.

(b) querySelector('selector'): This method is more flexible as it uses any CSS selector (like an ID, class, tag, or attribute) but only returns the first element it finds that matches the selector. For example, querySelector('#main') works like getElementById, but querySelector('.note') will only return the first element with the class note.

* Multiple Element Selection
(c) getElementsByClassName('className'): This method specifically looks for all elements that share a given class attribute (e.g., <p class="note">). It returns a special, live list (or collection) of all the matching elements.

(d) querySelectorAll('selector'): This is the most versatile method for getting multiple elements. It uses any CSS selector to find all elements that match, and it returns a static list (called a NodeList) of all the results. For example, querySelectorAll('.note') finds all elements with that class, and querySelectorAll('a[target="_blank"]') finds all links that open in a new tab.

2. How do you **create and insert a new element into the DOM**?
=> To create and insert a new element into the DOM, we must follow a three-step process: create, configure, and insert.

Create the Element 
First, use the document.createElement() method, passing the desired HTML tag name as a string, such as document.createElement('div') or document.createElement('li'). This command creates the element in memory, but it doesn't yet appear on the webpage.

Configure the Element 
Next, we must configure the new element by setting its properties. We can add content using the textContent or innerHTML properties, or set attributes like src or href using setAttribute(). We'll often use the classList property to add styling by applying one or more CSS class names.

Insert the Element 
Finally, we insert the new element into the DOM hierarchy by selecting an existing parent element and using one of the insertion methods. The most common methods are appendChild(), which places the new element as the last child inside the parent, and prepend(), which places it as the first child. Alternatively, we can use after() or before() to place the new element immediately after or before a specific existing element (making it a sibling).


3. What is **Event Bubbling** and how does it work?
=>Event bubbling is a concept in the Document Object Model (DOM) where an event, when triggered on a specific HTML element, "bubbles up" or propagates through its ancestor elements in the document tree.

When we click on an element, the event first triggers on that target element itself. Then, the event travels upwards to the element's parent, then to the parent's parent, all the way up to the document object and the window object. This means if we have a button inside a div, and the div inside a section, clicking the button will fire the click event on the button, then the div, then the section, and so on.

This mechanism is what allows for a powerful technique called event delegation, where we can attach a single event listener to a common ancestor (like a parent div or a list container) instead of attaching many listeners to individual child elements. The ancestor listener catches the event as it bubbles up from the actual element that was clicked, making the code more efficient and easier to manage.


4. What is **Event Delegation** in JavaScript? Why is it useful?
=>Event delegation is a technique in JavaScript where we attach a single event listener to a common parent (ancestor) element instead of attaching individual listeners to all of its child elements. The technique works because of event bubbling: when an event (like a click) happens on a child element, it travels up the DOM, and the single listener on the parent catches and processes the event. This approach is highly useful for two main reasons: it significantly improves performance by reducing the number of event listeners the browser has to manage, and it automatically handles events for any new elements added to the parent later, without needing to attach new listeners to them.


5. What is the difference between **preventDefault() and stopPropagation()** methods?
=>The two methods, preventDefault() and stopPropagation(), serve distinct purposes in managing JavaScript events.

preventDefault() is used to stop the browser's default action associated with an event; for example, calling it on a click event for an anchor tag (<a>) prevents the browser from navigating to the linked URL, or calling it on a form submission event prevents the form from actually submitting and reloading the page.

In contrast, stopPropagation() is used to stop the event from bubbling up (or propagating) through the DOM hierarchy; it ensures that the event will not travel up to the parent elements, preventing any event listeners attached to those ancestors from reacting to the event.

