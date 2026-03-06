export const progressStep = Object.freeze({
    "Accreditation": 1,
    "Syllabus": 2,
    "Review": 3,
    "PerformanceHistory": 4,
    "Error": 5,
    "Rubric": 6
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

    [progressStep.PerformanceHistory]: {
        name: "Performance History",
        to: "performance-history",
    },

    [progressStep.Error]: {
        name: "Error",
        to: "error",
    },

    [progressStep.Rubric]: {
        name: "Rubric",
        to: "rubrics",
    },
})