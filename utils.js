/**
*@param {string} type - The HTML tag name (e.g, "div", "p", etc);
*@param {string} className - Optional Css class to add set null if dont need
*@param {string} id - Optional id for the element. set null if dont need
*@param {string} text - Optional textContent to add set null if dont need
*@param {Object} [attrib={}] - Optional attributes as key-value pairs.
*@param {object} [style={}] - optional inline css Style as a Key-value pairs.
*/
export function newElement(type, className, id, text, attrib = {}, style = {}) {
    const element = document.createElement(type);
    if (id != null) {
        element.id = id;
    }
    if (className != null) {
        element.classList.add(className);
    }
    if (text != null) {
        element.textContent = text;
    }

    for (const [prop, value] of Object.entries(style)) {
        element.style[prop] = value;
    }
    return element;
}

/**
 * @param {HTMLElement} element - element to apply the style.
 *@param {object} [style={}] - optional inline css Style as a Key-value pairs.
 */

export function applyStyle(element, style = {}) {
    for (const[prop, value] of Object.entries(style)) {
        element.style[prop] = value;
    }
}

/**
 * @param {HTMLElement} element - element to apply the style.
 *@param {object} [attrib={}] - Optional attributes as key-value pairs.
 */
export function applyAttrib(element, attrib ={})
{
    for(const[key, value] of Object.entries(attrib))
    {
        if(key === "classList")
        {
            if(Array.isArray(value))
            {
                value.forEach(cls => element.classList.add(cls));
            }
            else{
                element.classList.add(value);
            }
        }
        else if (key in element)
        {
            element[key] = value;
        }
        else{
            element.setAttribute(prop, value);
        }
    }
}

/**
 * 
 * @param {HTMLElement} container - list of container to toggle on and off. 
 */

export function toggleContainer(container, style = {}){
    for(const [key, value] in Object.entries)
    {
        applyStyle(container, {
            opacity : value
        })
    }
}