import pandas as pd
from src.data_processing import load_data, preprocess_data
from src.clustering import RecipeRecommender
from src.search import IngredientSearch
import logging

def main():
    logging.basicConfig(level=logging.INFO)
    
    try:
        # Load and preprocess data
        data = load_data()
        data = preprocess_data(data)
        
        # Initialize recommender
        recommender = RecipeRecommender()
        recommender.fit(data)
        
        # Example: Recommend recipes based on user needs
        user_needs = {
            'Calories': 200.460115,
            'FatContent': 8.203982,
            'ProteinContent': 6.790533,
            'CarbohydrateContent': 30.698844
        }
        recommendations = recommender.recommend(user_needs)
        logging.info("Recommended recipes:")
        logging.info(recommendations[['RecipeId', 'Name', 'RecipeIngredientParts']])
        
        # Initialize search
        search = IngredientSearch(data)
        search.prepare_search_data()
        
        # Example: Search by ingredients
        similar_recipes = search.search_by_ingredient("rice, butter")
        logging.info("Search results:")
        logging.info(similar_recipes)
        
    except Exception as e:
        logging.error(f"Error in main: {e}")
        raise

if __name__ == "__main__":
    main()