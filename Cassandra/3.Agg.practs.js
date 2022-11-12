//  name of the suppliers who reside in mumbai/pune/chennai[CI]
// who have supplied a book placed on rack_numbers A1/A2/A3
// and their category is not JAVA 
db.getCollection("LMS_SUPPLIERS_DETAILS").aggregate(
    [
        {
            "$lookup" : {
                "from" : "LMS_BOOK_DETAILS",
                "localField" : "SUPPLIER_ID",
                "foreignField" : "SUPPLIER_ID",
                "as" : "books_that_have_been_issued"
            }
        }, 
        {
            "$unwind" : {
                "path" : "$books_that_have_been_issued"
            }
        }, 
        {
            "$match" : {
                "ADDRESS" : {
                    "$in" : [
                        /pune/i,
                        /mumbai/i,
                        /chennai/i
                    ]
                }
            }
        }, 
        {
            "$match" : {
                "books_that_have_been_issued.RACK_NUM" : {
                    "$in" : [
                        "A1",
                        "A2",
                        "A3"
                    ]
                }
            }
        }, 
        {
            "$match" : {
                "books_that_have_been_issued.CATEGORY" : {
                    "$not" : /java/i
                }
            }
        }, 
        {
            "$project" : {
                "_id": 0,
                "SUPPLIER_NAME" : 1.0
            }
        }
    ], 
);
//book_code and name of the book which has been issued more than 4 times and has more than 0 suppliers
// (Note: Java how to program has 2 book codes because of different published date)
db.getCollection("LMS_BOOK_DETAILS").aggregate(
    [
        {
            "$lookup" : {
                "from" : "LMS_BOOK_ISSUE",
                "localField" : "BOOK_CODE",
                "foreignField" : "BOOK_CODE",
                "as" : "issued_books"
            }
        }, 
        {
            "$unwind" : {
                "path" : "$issued_books"
            }
        }, 
        {
            "$group" : {
                "_id" : {
                    "book_code" : "$issued_books.BOOK_CODE"
                },
                "cnt" : {
                    "$sum" : 1.0
                }
            }
        }, 
        {
            "$match" : {
                "cnt" : {
                    "$gt" : 4.0
                }
            }
        }, 
        {
            "$project" : {
                "_id" : 0.0,
                "book_code" : "$_id.book_code"
            }
        }
    ], 
);
/* name of the book which has been issued atleast twice 
and sort the result based on name of the book  ascending */ 
db.getCollection("LMS_BOOK_DETAILS").aggregate(
    [
        {
            "$lookup" : {
                "from" : "LMS_BOOK_ISSUE",
                "localField" : "BOOK_CODE",
                "foreignField" : "BOOK_CODE",
                "as" : "issued_books"
            }
        }, 
        {
            "$unwind" : {
                "path" : "$issued_books"
            }
        }, 
        {
            "$group" : {
                "_id" : {
                    "book_code" : "$issued_books.BOOK_CODE",
                    "book_name" : "$BOOK_TITLE"
                },
                "cnt" : {
                    "$sum" : 1.0
                }
            }
        }, 
        {
            "$match" : {
                "cnt" : {
                    "$gt" : 2.0
                }
            }
        }, 
        {
            "$sort" : {
                "_id.book_name" : 1.0
            }
        }, 
        {
            "$project" : {
                "_id" : 0.0,
                "book_code" : "$_id.book_code",
                "book_name" : "$_id.book_name"
            }
        }
    ], 
);

/*
-- total number of books placed on given rack number 
-- such that edition of the book is atleast 3 
-- and it is supplied by a supplier who has a rediff / gmail account
-- and the book is issued to the students who are permanent in status
*/
db.getCollection("LMS_MEMBERS").aggregate(
    [
        {
            "$lookup" : {
                "from" : "LMS_BOOK_ISSUE",
                "localField" : "MEMBER_ID",
                "foreignField" : "MEMBER_ID",
                "as" : "book_issued_to_members"
            }
        }, 
        {
            "$unwind" : {
                "path" : "$book_issued_to_members"
            }
        }, 
        {
            "$lookup" : {
                "from" : "LMS_BOOK_DETAILS",
                "localField" : "book_issued_to_members.BOOK_CODE",
                "foreignField" : "BOOK_CODE",
                "as" : "books_issued"
            }
        }, 
        {
            "$unwind" : {
                "path" : "$books_issued"
            }
        }, 
        {
            "$lookup" : {
                "from" : "LMS_SUPPLIERS_DETAILS",
                "localField" : "books_issued.SUPPLIER_ID",
                "foreignField" : "SUPPLIER_ID",
                "as" : "suppliers"
            }
        }, 
        {
            "$unwind" : {
                "path" : "$suppliers"
            }
        }, 
        {
            "$match" : {
                "books_issued.BOOK_EDITION" : {
                    "$gt" : 3.0
                }
            }
        }, 
        {
            "$match" : {
                "suppliers.EMAIL" : {
                    "$in" : [
                        /.*gmail.com/,
                        /.*rediff.com/,
                        /.*redif.com/
                    ]
                }
            }
        }, 
        {
            "$group" : {
                "_id" : {
                    "book_code" : "$book_issued_to_members.BOOK_CODE",
                    "Rack_num" : "$books_issued.RACK_NUM"
                },
                "no_of_books" : {
                    "$sum" : 1.0
                }
            }
        }, 
        {
            "$project" : {
                "_id" : 0.0,
                "bk" : "$_id.book_code",
                "rnum" : "$_id.Rack_num",
                "n_bk" : "$no_of_books"
            }
        }
    ], 
);


