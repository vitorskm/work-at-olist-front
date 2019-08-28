export const searchNodeValidationSteps = (component) => {
    return component.root.childNodes[3].childNodes.filter(el=>{return el.id === "step-shape"});
}

export const searchLastValidationStepElement = (component) => {
    const elements = searchNodeValidationSteps(component);
    return elements[elements.length - 1];
}

export const searchElementNode = (component, n1, n2 = null) => {
    if( n2 === null ) return component.root.childNodes[n1];

    return component.root.childNodes[n1].childNodes[n2];
}