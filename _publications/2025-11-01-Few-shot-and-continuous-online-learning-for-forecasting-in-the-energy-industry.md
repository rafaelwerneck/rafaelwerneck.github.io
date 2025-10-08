---
title: "Few-shot and continuous online learning for forecasting in the energy industry"
collection: publications
category: manuscripts
permalink: /publication/2025-11-01-Few-shot-and-continuous-online-learning-for-forecasting-in-the-energy-industry
excerpt: 'Forecasting in the energy sector is critical for planning and efficiency, but existing methods require extensive historical data and struggle with changing conditions. This work presents a few-shot forecasting method for energy time series prediction under nonstationary conditions and data scarcity. The solution “plugs into” any existing regressor, combining ideas to create a flexible data-efficient tool.'
date: 2025-11-01
venue: 'Energy'
doi: 'https://doi.org/10.1016/j.energy.2025.138470'
paperurl: 'https://doi.org/10.1016/j.energy.2025.138470' #TODO: Chage to local file
bibtexurl: '/files/cirac2025fewshot.bib'
citation: 'Gabriel Cirac, Vinicius Eduardo Botechia, Denis José Schiozer, Víctor Martínez, Rafael de Oliveira Werneck, and Anderson Rocha. Few-shot and continuous online learning for forecasting in the energy industry. Energy, 336:138470, 2025.'
---

Forecasting in the energy sector is critical for planning and efficiency, but existing methods require extensive historical data and struggle with changing conditions. This work presents a few-shot forecasting method for energy time series prediction under nonstationary conditions and data scarcity. The solution “plugs into” any existing regressor, combining ideas to create a flexible data-efficient tool. The model is continuously updated with two daily samples, a marked reduction compared to conventional batch-based training. This efficiency is guaranteed by a moving window, which prioritizes recent patterns and avoids machine learning drift. A normalization technique recalibrates cumulative sum forecasts by adjusting future targets relative to the latest observed series segment. This narrows the extrapolation range as new data arrives, aligning predictions with the updated training range. Complex architectures are not required when using the approach, as evidenced by an ablation study. The method surpassed algorithms like Time-series Dense Encoder and Neural Basis Expansion Analysis. Promising results were yielded on diverse datasets, including the Volve petroleum field, the UNISIM-II-H synthetic case, and the Open-Power-System-Data. Also, a longitudinal interpretability method is employed. This research aligns with the industry’s real needs, where data is limited and arrives in real-time streams.