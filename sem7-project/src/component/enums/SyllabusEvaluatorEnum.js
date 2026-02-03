export const progressStep = Object.freeze({
    "Accreditation": 1,
    "Syllabus": 2,
    "Review": 3
})

export const navObj = Object.freeze({
    [progressStep.Accreditation]: {
        name: "Accreditation PDFs",
        to: "accreditation-pdf"
    },
    
    [progressStep.Syllabus]: {
        name: "Syllabus Structure PDF",
        to: "syllabus-pdf",
    },
    
    [progressStep.Review]: {
        name: "Peformance Summary",
        to: "performance-summary",
    },
})