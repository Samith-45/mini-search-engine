package com.searchforge.controller;

import com.searchforge.dto.BM25CalculationRequestDTO;
import com.searchforge.dto.BM25CalculationResponseDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/playground")
public class PlaygroundController {

    @PostMapping("/calculate")
    public ResponseEntity<BM25CalculationResponseDTO> calculateBM25(@RequestBody BM25CalculationRequestDTO req) {
        int N = Math.max(1, req.getTotalDocuments());
        int DF = Math.max(0, req.getDocumentFrequency());
        int TF = Math.max(0, req.getTermFrequency());
        double avgdl = Math.max(1.0, req.getAverageDocumentLength());
        int docLen = Math.max(1, req.getDocumentLength());
        double k1 = Math.max(0.1, req.getK1());
        double b = Math.max(0.0, Math.min(1.0, req.getB()));

        // 1. IDF Calculation: ln(1 + (N - DF + 0.5) / (DF + 0.5))
        double idf = Math.log(1.0 + (N - DF + 0.5) / (DF + 0.5));

        // 2. Length Normalization Factor: 1 - b + b * (|d| / avgdl)
        double lenNorm = 1.0 - b + b * ((double) docLen / avgdl);

        // 3. Saturated TF Factor: (TF * (k1 + 1)) / (TF + k1 * lenNorm)
        double saturatedTf = (TF * (k1 + 1.0)) / (TF + k1 * lenNorm);

        // 4. Final BM25 Score: IDF * Saturated TF
        double bm25Score = idf * saturatedTf;

        // 5. Classic TF-IDF Baseline: (TF / |d|) * (ln((N + 1) / (DF + 1)) + 1)
        double classicTf = (double) TF / docLen;
        double classicIdf = Math.log(((double) N + 1.0) / (DF + 1.0)) + 1.0;
        double tfidfScore = classicTf * classicIdf;

        String breakdown = String.format(
                "Step 1: IDF = ln(1 + (%d - %d + 0.5) / (%d + 0.5)) = %.4f\n" +
                "Step 2: Length Norm Factor = 1 - %.2f + %.2f * (%d / %.1f) = %.4f\n" +
                "Step 3: Saturated TF = (%d * (%.2f + 1)) / (%d + %.2f * %.4f) = %.4f\n" +
                "Step 4: Final BM25 Score = %.4f * %.4f = %.4f (vs Classical TF-IDF: %.4f)",
                N, DF, DF, idf,
                b, b, docLen, avgdl, lenNorm,
                TF, k1, TF, k1, lenNorm, saturatedTf,
                idf, saturatedTf, bm25Score, tfidfScore
        );

        return ResponseEntity.ok(new BM25CalculationResponseDTO(
                Math.round(idf * 10000.0) / 10000.0,
                Math.round(lenNorm * 10000.0) / 10000.0,
                Math.round(saturatedTf * 10000.0) / 10000.0,
                Math.round(bm25Score * 10000.0) / 10000.0,
                Math.round(tfidfScore * 10000.0) / 10000.0,
                breakdown
        ));
    }
}
