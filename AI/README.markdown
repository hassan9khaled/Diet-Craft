# Recipe Recommender

A Python-based recipe recommendation system that uses clustering and ingredient-based search to suggest recipes based on nutritional needs and available ingredients.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd recipe_recommender
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

1. Place your data files in the `data/` directory.
2. Run the training script:
   ```bash
   python scripts/train_model.py
   ```
3. Run the main application:
   ```bash
   python main.py
   ```

## Project Structure

- `src/`: Source code for data processing, clustering, and search.
- `data/`: Input datasets and preprocessed data.
- `models/`: Saved machine learning models.
- `scripts/`: Scripts for training and other tasks.
- `main.py`: Entry point for the application.
- `config.yaml`: Configuration settings.

## Requirements

See `requirements.txt` for a list of dependencies.