import pandas as pd
import ast
import logging
from src.utils import clean_recipe_text
from src.config import CONFIG

def load_data():
    """
    Loads and merges recipe and image datasets.
    
    Returns:
        pd.DataFrame: Merged DataFrame.
    """
    try:
        # Load recipes
        data = pd.read_csv(CONFIG.data_paths['recipes'])
        logging.info(f"Loaded recipes data with {len(data)} rows")
        
        # Load images
        imgs = pd.read_csv(CONFIG.data_paths['images'], usecols=['Images'], nrows=len(data))
        logging.info(f"Loaded images data with {len(imgs)} rows")
        
        # Merge datasets
        data['Images'] = imgs['Images']
        return data
    except FileNotFoundError as e:
        logging.error(f"Data file not found: {e}")
        raise
    except Exception as e:
        logging.error(f"Error loading data: {e}")
        raise

def preprocess_data(data):
    """
    Preprocesses recipe data by cleaning text columns and handling missing values.
    
    Args:
        data (pd.DataFrame): Input DataFrame.
    
    Returns:
        pd.DataFrame: Preprocessed DataFrame.
    """
    try:
        # Convert string representations of lists to actual lists
        data['RecipeIngredientParts'] = data['RecipeIngredientParts'].apply(ast.literal_eval)
        data['RecipeInstructions'] = data['RecipeInstructions'].apply(ast.literal_eval)
        
        # Check for missing values
        missing_percent = data.isnull().sum() / len(data) * 100
        logging.info(f"Missing values:\n{missing_percent}")
        
        return data
    except Exception as e:
        logging.error(f"Error preprocessing data: {e}")
        raise