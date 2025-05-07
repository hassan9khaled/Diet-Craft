import pandas as pd
from src.data_processing import load_data, preprocess_data
from src.clustering import RecipeRecommender
import logging

def main():
    logging.basicConfig(level=logging.INFO)
    try:
        # Load and preprocess data
        data = load_data()
        data = preprocess_data(data)
        
        # Train clustering model
        recommender = RecipeRecommender()
        recommender.fit(data)
        
        logging.info("Model training completed")
    except Exception as e:
        logging.error(f"Error in training: {e}")
        raise

if __name__ == "__main__":
    main()