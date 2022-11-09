// var distance = require('jaro-winkler');

const tokenize = (string) => {
    return string.split(/[,.\s]/)
}

const stem = (string) => {
    var stemmer = require('porter-stemmer').stemmer
    return stemmer(string)
}

export const stringSimilarity = (str1, str2) =>{ 
    // Lowercase -> tokenize -> stem -> ratio of number of matching stems b/w two strings
    if(str1.length>0 && str2.length>0){ 
        const stems1 = tokenize(str1.toLocaleLowerCase()).map(word => stem(word))
        const stems2 = tokenize(str2.toLocaleLowerCase()).map(word => stem(word))
        const matches = stems1.filter(stem => stems2.includes(stem))
        return matches.length/(stems1.length > stems2.length? stems1.length: stems2.length)

        

    } 
    
    console.log(0)
    return 0.0 
}
