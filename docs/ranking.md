# Relevance Ranking Algorithms: TF-IDF & Okapi BM25

SearchForge implements both classical **TF-IDF** and state-of-the-art **Okapi BM25** ranking algorithms from first principles.

## 1. Classical TF-IDF Formulation

For a query $q$ containing terms $t$ and document $d$:

$$Score_{TFIDF}(q, d) = \sum_{t \in q} TF(t, d) \times IDF(t)$$

Where:
- **Normalized Term Frequency**:
  $$TF(t, d) = \frac{f_{t,d}}{|d|}$$
- **Smoothed Logarithmic Inverse Document Frequency**:
  $$IDF(t) = \ln\left( \frac{N + 1}{DF(t) + 1} \right) + 1$$

## 2. Okapi BM25 Formulation

Okapi BM25 addresses the limitations of linear TF-IDF by incorporating **term frequency saturation** and **document length normalization penalty**:

$$Score_{BM25}(q, d) = \sum_{t \in q} IDF(t) \cdot \frac{f_{t,d} \cdot (k_1 + 1)}{f_{t,d} + k_1 \cdot \left(1 - b + b \cdot \frac{|d|}{avgdl}\right)}$$

Where:
- **BM25 Inverse Document Frequency**:
  $$IDF(t) = \ln\left( 1 + \frac{N - DF(t) + 0.5}{DF(t) + 0.5} \right)$$
- **Parameter $k_1$ (Term Saturation)**: Default $1.2$. Controls how fast term frequency impact saturates. As $f_{t,d} \to \infty$, term component approaches $k_1 + 1$.
- **Parameter $b$ (Length Normalization)**: Default $0.75$. Controls the penalty applied to long documents. When $b=1$, score is fully scaled relative to document length.
- **$avgdl$**: Average document word count across the entire corpus.
