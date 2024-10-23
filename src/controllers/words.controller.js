import Word from '../modals/word.model.js';
import { ApiError } from '../utils/apiErrorHandler.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const addWord = asyncHandler(async (req, res) => {
    const { word } = req.body;
    const existingWord = await Word.findOne({ word });
    if (existingWord) {
        return res.status(409).json({
            status: 409,
            message: 'Word already exists.',
        });
    }
    const newWord = new Word({ word });
    try {
        await newWord.save();
        return res.status(201).json(new ApiResponse(201, newWord, 'Word added successfully'));
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: 'An error occurred while adding the word.',
            error: error.message
        });
    }
});



const deleteWord = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const word = await Word.findById(id);
    if (!word) {
        throw new ApiError(404, 'Word not found');
    }
    await Word.findByIdAndDelete(id);
    return res.status(200).json(new ApiResponse(200, null, 'Word deleted successfully'));
});

const addMeaning = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { meaning } = req.body;
    console.log(id,meaning);
    
    const word = await Word.findById(id);
    if (!word) {
        throw new ApiError(404, 'Word not found');
    }
    word.meanings.push({ meaning });
    await word.save();
    return res.status(200).json(new ApiResponse(200, word, 'Meaning added successfully'));
});

const updateMeaning = asyncHandler(async (req, res) => {
    const { id, meaningId } = req.params;
    const { meaning } = req.body;
    const word = await Word.findOne({ _id: id, 'meanings._id': meaningId });
    if (!word) {
        throw new ApiError(404, 'Word or meaning not found');
    }
    const meaningToUpdate = word.meanings.id(meaningId);
    if (meaningToUpdate) {
        meaningToUpdate.meaning = meaning;
        await word.save();
    }
    return res.status(200).json(new ApiResponse(200, word, 'Meaning updated successfully'));
});

const deleteMeaning = asyncHandler(async (req, res) => {
    const { id, meaningId } = req.params;

    const word = await Word.findById(id);
    if (!word) {
        throw new ApiError(404, 'Word not found');
    }
    const meaningIndex = word.meanings.findIndex(meaning => meaning._id.toString() === meaningId);
    if (meaningIndex === -1) {
        throw new ApiError(404, 'Meaning not found');
    }
    word.meanings.splice(meaningIndex, 1);
    await word.save();
    return res.status(200).json(new ApiResponse(200, word, 'Meaning deleted successfully'));
});

const updateWordName = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { wordName } = req.body;
    const word = await Word.findById(id);
    if (!word) {
        throw new ApiError(404, 'Word not found');
    }
    word.word = wordName;
    await word.save();
    return res.status(200).json(new ApiResponse(200, word, 'Word updated successfully'));
});

const searchWords = asyncHandler(async (req, res) => {
    const { query } = req.query; 
    const words = await Word.find({ word: { $regex: query, $options: 'i' } });
    return res.status(200).json(new ApiResponse(200, words, 'Words retrieved successfully'));
});

const getWordById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const word = await Word.findById(id);
    if (!word) {
        throw new ApiError(404, 'Word not found');
    }
    return res.status(200).json(new ApiResponse(200, word, 'Word retrieved successfully'));
});

const getAllWords = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit; 

    const words = await Word.find()
        .limit(Number(limit))
        .skip(Number(skip));
    
    const totalWords = await Word.countDocuments(); 
    const totalPages = Math.ceil(totalWords / limit); 

    return res.status(200).json(new ApiResponse(200, {
        words,
        totalWords,
        totalPages,
        currentPage: Number(page),
    }, 'Words retrieved successfully'));
});

export { 
    addWord, 
    deleteWord, 
    addMeaning, 
    updateMeaning, 
    deleteMeaning, 
    updateWordName, 
    searchWords, 
    getWordById,
    getAllWords 
};