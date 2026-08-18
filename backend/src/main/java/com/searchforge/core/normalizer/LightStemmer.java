package com.searchforge.core.normalizer;

/**
 * Lightweight English stemmer stripping common suffixes ('ing', 'edly', 'ed', 'es', 's', 'ly').
 */
public class LightStemmer {

    public String stem(String word) {
        if (word == null || word.length() <= 3) {
            return word;
        }

        String w = word;

        if (w.endsWith("ingly") && w.length() > 6) {
            return w.substring(0, w.length() - 5);
        }
        if (w.endsWith("ing") && w.length() > 5) {
            return w.substring(0, w.length() - 3);
        }
        if (w.endsWith("edly") && w.length() > 5) {
            return w.substring(0, w.length() - 4);
        }
        if (w.endsWith("ed") && w.length() > 4) {
            return w.substring(0, w.length() - 2);
        }
        if (w.endsWith("ies") && w.length() > 4) {
            return w.substring(0, w.length() - 3) + "y";
        }
        if (w.endsWith("es") && w.length() > 4) {
            return w.substring(0, w.length() - 2);
        }
        if (w.endsWith("s") && !w.endsWith("ss") && w.length() > 3) {
            return w.substring(0, w.length() - 1);
        }

        return w;
    }
}
