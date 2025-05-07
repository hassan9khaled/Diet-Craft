import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
import pickle
import logging
from src.config import CONFIG

class RecipeRecommender:
    def __init__(self):
        self.scaler = StandardScaler()
        self.kmeans = KMeans(
            n_clusters=CONFIG.clustering_params['n_clusters'],
            random_state=CONFIG.clustering_params['random_state']
        )
        self.data = None
        self.cluster_summary = None

    def fit(self, data):
        """
        Fits the clustering model on nutritional data.
        
        Args:
            data (pd.DataFrame): Input DataFrame with nutritional columns.
        """
        try:
            self.data = data
            features = ['Calories', 'FatContent', 'ProteinContent', 'CarbohydrateContent']
            X = data[features]
            
            # Scale features
            X_scaled = self.scaler.fit_transform(X)
            
            # Fit KMeans
            self.kmeans.fit(X_scaled)
            data['Cluster'] = self.kmeans.labels_
            
            # Compute cluster summary
            self.cluster_summary = data.groupby('Cluster')[features].mean()
            logging.info("Clustering model trained successfully")
            
            # Save model
            with open(CONFIG.model_path, 'wb') as f:
                pickle.dump(self.kmeans, f)
            logging.info(f"Model saved to {CONFIG.model_path}")
        except Exception as e:
            logging.error(f"Error fitting clustering model: {e}")
            raise

    def recommend(self, user_needs):
        """
        Recommends recipes based on user's nutritional needs.
        
        Args:
            user_needs (dict): Dictionary with nutritional requirements.
        
        Returns:
            pd.DataFrame: Recommended recipes.
        """
        try:
            user_df = pd.DataFrame([user_needs])
            user_scaled = self.scaler.transform(user_df)
            user_cluster = self.kmeans.predict(user_scaled)
            logging.info(f"User assigned to cluster: {user_cluster[0]}")
            
            recommended_recipes = self.data[self.data['Cluster'] == user_cluster[0]]
            return recommended_recipes.sample(min(10, len(recommended_recipes)))
        except Exception as e:
            logging.error(f"Error recommending recipes: {e}")
            raise