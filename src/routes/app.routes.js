import { Router } from "express";
import {
    addWord,
    deleteWord,
    addMeaning,
    updateMeaning,
    deleteMeaning,
    updateWordName,
    searchWords,
    getWordById,
    getAllWords
} from '../controllers/words.controller.js';

const router = Router();

router.post('/words', addWord);

router.delete('/words/:id', deleteWord);

router.post('/words/:id/meanings', addMeaning);

router.put('/words/:id/meanings/:meaningId', updateMeaning);

router.delete('/words/:id/meanings/:meaningId', deleteMeaning);

router.put('/words/:id', updateWordName);

router.get('/words/search', searchWords);

router.get('/words/:id', getWordById);

router.get('/words', getAllWords);

export default router;
