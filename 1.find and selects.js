// update members collection set status = 'Temporary ' for all members who belong to Pune (CI)
db.LMS_MEMBERS.updateMany({"CITY": /pune/i},{$set: {MEMBERSHIP_STATUS: "Temporary"}})
// update book details and set edition number = 10 for all books with python category
db.LMS_BOOK_DETAILS.updateMany({"CATEGORY":/python/i}, {$set:{"BOOK_EDITION": 10}})
// update book details and set edition number = 15 and price 10,000 for all books with python category
db.LMS_BOOK_DETAILS.updateMany({"CATEGORY": /python/i}, {$set: {"BOOK_EDITION": 15 ,"PRICE": 10000}})
// Name of the supplier that reside in chennai  [Case insensitive ]
db.LMS_SUPPLIERS_DETAILS.find({"ADDRESS": /chennai/i},{"SUPPLIER_NAME" :1, "_id" :0})
// Name of the supplier that reside in chennai/delhi/ahmedabad  [Case insensitive ]
db.LMS_SUPPLIERS_DETAILS.find({"ADDRESS": {$in: [/chennai/i,/delhi/i,/ahemdabad/i]}},{"SUPPLIER_NAME": 1})
// Name of the supplier , contact , email , Address 
db.LMS_SUPPLIERS_DETAILS.find({})
// who resides in either Mumbai Or Delhi [CI] and email does not belong to gmail account
db.LMS_SUPPLIERS_DETAILS.find({$or: [{ADDRESS:/mumbai/i},{ADDRESS: /delhi/i}], EMAIL: {$not: /.*@gmail/}},{"SUPPLIER_NAME": 1,"_id":0})
// book_name,book_publication
db.LMS_BOOK_DETAILS.find({},{"BOOK_TITLE":1,"PUBLICATION":1})
// of all books placed on rack_num = a1 and publication is not equal to tata mcgraw hill
db.LMS_BOOK_DETAILS.find({$and: [{"RACK_NUM": /A1/i},{PUBLICATION: {$ne:"TATA MCGRAW HILL"}}]},{"BOOK_TITLE":1 , "PUBLICATION":1})
// book_code , member_id of all book issuances which have been fined 
db.LMS_BOOK_ISSUE.find({FINE_RANGE:{$ne: null}},{"BOOK_CODE":1,"MEMBER_ID":1,"_id":0})
// Query for embedded json
// book_name and publication whose has atleast one supplier from chennai (CI)
//---------------------------------------------------------------------------------------------

