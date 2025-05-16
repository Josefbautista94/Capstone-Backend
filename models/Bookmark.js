import mongoose from "mongoose";

const BookmarkSchema = new mongoose.Schema({

    cmplntNum: {
        type: String,    // Stores the crime's unique complaint number (from the NYC API’s CMPLNT_NUM field)
        required: true, // Required so users can't bookmark without this key
        unique: true,  // Unique to prevent the same incident from being bookmarked more than once
    },
    boroNm: {
        type: String,   // Stores the borough name (e.g., "MANHATTAN", "BRONX") from BORO_NM
        required: true // You want to know where the crime took place
    },
    ofnsDesc: {
        type: String, // Stores the offense description from OFNS_DESC (e.g., "BURGLARY,RESIDENCE")
        required: true
    },
    lawCatCd: {
        type: String // Optional field that stores the law category code (e.g., "FELONY", "MISDEMEANOR")
    },
    pdDesc: {
        type: String // Stores a more specific police department description (e.g., "GRAND LARCENY") from PD_DESC
    },
    latitude: { // Geographic coordinates from the public dataset, Required to place the bookmark on a map
        type: Number,
        required: true
    },
    longitude: { // Geographic coordinates from the public dataset, Required to place the bookmark on a map
        type: Number,
        required: true
    },
    notes: {
        type: String // Optional field for user-created notes, like “Close to my apartment” or “Follow up on this one”
    },
    bookmarkedAt: {
        type: Date, // Timestamp for when the user bookmarked this crime
        default: Date.now // Automatically set to the current time unless provided
    },
    crmAtptCptdCd: String,
    premTypDesc: String,
    locOfOccurDesc: String,
    rptDt: String,
    stationName: String,
    hadevelopt: String,
    vicSex: String,
    vicAgeGroup: String,
    vicRace: String,
    suspSex: String,
    suspAgeGroup: String,
    suspRace: String,
});

const Bookmark = mongoose.model("Bookmark", BookmarkSchema); // Tells mongoose, register a model called Bookmark using this schema, MongoDB will create a bookmarks collection (pluralized and lowercase)
// Second argument bookmarkSchema is a blueprint that defines what each document should look like.

export default Bookmark;
