import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import logging
from src.config import CONFIG

class IngredientSearch:
    def __init__(self, data):
        self.vectorizer = TfidfVectorizer(stop_words='english')
        self.data = data
        self.tfidf_matrix = None
        self.search_df = None

    def prepare_search_data(self):
        """
        Prepares data for ingredient-based search.
        """
        try:
            self.search_df = pd.DataFrame({
                'RecipeIngredientParts': self.data['RecipeIngredientParts']
            })
            self.search_df['IngredientsString'] = self.search_df['RecipeIngredientParts'].apply(
                lambda x: ' '.join(x).lower()
            )
            self.tfidf_matrix = self.vectorizer.fit_transform(self.search_df['IngredientsString'])
            self.search_df.to_csv(CONFIG.data_paths['search_data'], index=False)
            logging.info("Search data prepared and saved")
        except Exception as e:
            logging.error(f"Error preparing search data: {e}")
            raise

    def search_by_ingredient(self, ingredients, top_matches=None):
        """
        Searches recipes by ingredients.
        
        Args:
            ingredients (str): Comma-separated string of ingredients.
            top_matches (int, optional): Number of top matches to return.
        
        Returns:
            pd.DataFrame: Top matching recipes.
        """
        try:
            if top_matches is None:
                top_matches = CONFIG.search_params['top_matches']
                
            # Clean input
            ingredients = ingredients.lower().replace(',', '').replace(' ', '')
            ingredient_vector = self.vectorizer.transform([ingredients])
            
            # Compute similarities
            similarities = cosine_similarity(ingredient_vector, self.tfidf_matrix).flatten()
            top_indices = similarities.argsort()[-top_matches:][::-1]
            
            return self.data.iloc[top_indices][['RecipeId', 'Name', 'RecipeIngredientParts']]
        except Exception as e:
            logging.error(f"Error searching by ingredient: {e}")
            raise