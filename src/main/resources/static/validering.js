function validerInputs(inputs) {
    let invalid = [];

    for (let input of inputs) {
        let regexp = createRegex(input.name);
        let valid = regexp.test(input.value);
        if (!valid) {
            invalid.push(input);
        }
    }
    return invalid;
}

function createRegex (type) {
   switch (type) {
       case 'Navn':
            return /^[a-zA-ZåæøÅÆØ. \-]{2,30}$/;
       case 'Personnummer':
             return /^[a-zA-ZåæøÅÆØ.0-9 \-]{2,11}$/
       case 'Addresse':
            return /^[a-zA-ZåæøÅÆØ.0-9 \-]{2,60}$/;
       case 'Kjennetegn':
            return /^[a-zA-ZåæøÅÆØ.0-9 \-]{2,11}$/;
       default:
           break;
   }
}