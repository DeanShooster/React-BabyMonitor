import { IDictionary } from "../Context/DictionaryContext";

export const HebrewDictionary: IDictionary = {
  General: {
    appName: "Tracker",
    login: "התחברות",
    register: "הרשמה",
    mother: "אמא",
    baby: "תינוק",
    password: "סיסמא",
    next: "המשך",
    uploadFile: "תמונה להעלאה",
    lastUpdate: "עודכן לאחרונה",
    missingInformation: "אין נתונים קודמים",
  },
  Errors: {
    noData: "חסרים נתונים",
    invalidLanguageName: "שם לא תקין, עברית בלבד",
    somethingWentWrong: "משהו השתבש",
    wrongCredentials: "נתונים לא תקינים",
    invalidWeight: "משקל לא תקין",
    invalidHeight: "גובה לא תקין",
    invalidBirthDate: "תאריך לידה לא תקין",
    invalidFile: "קובץ לא תקין",
  },
  Home: {
    welcome: "ברוך הבא",
    newBabyNotice: "מזל טוב לתינוקי! אנחנו צריכים לעדכן כמה פרטים.",
    weight: `משקל גרם`,
    height: `גובה ס"מ`,
    birthDate: "תאריך לידה",
    successSign: "הרשמה בוצעה בהצלחה!",
    dailyStats: "נתון יומי",
    singleYear: "שנה",
    manyYears: "שנים",
    singleMonth: "חודש",
    manyMonths: "חודשים",
    singleDay: "יום",
    manyDays: "ימים",
  },
  HeadersForm: {
    notes: "הערות",
    update: "עדכון",
    start: "התחלה",
    end: "סיום",
  },
};
