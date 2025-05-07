import re
import pandas as pd
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def clean_recipe_text(text):
    """
    Extracts ingredients or instructions from a string formatted as 'c("item1", "item2", ...)'.
    
    Args:
        text (str): Input string.
    
    Returns:
        list: List of cleaned items.
    """
    try:
        match = re.search(r'c\(([^)]+)\)', text)
        if not match:
            logging.warning(f"No valid content found in text: {text}")
            return []
        items = match.group(1).split(', ')
        return [item.strip('\"') for item in items]
    except Exception as e:
        logging.error(f"Error cleaning text: {e}")
        return []

def detect_outliers(df):
    """
    Detects outliers in numeric columns using IQR method.
    
    Args:
        df (pd.DataFrame): Input DataFrame.
    
    Returns:
        dict: Dictionary with column names and outlier counts.
    """
    outliers = {}
    numeric_cols = df.select_dtypes(include=['float64', 'int64']).columns
    for col in numeric_cols:
        Q1 = df[col].quantile(0.25)
        Q3 = df[col].quantile(0.75)
        IQR = Q3 - Q1
        lower_bound = Q1 - 1.5 * IQR
        upper_bound = Q3 + 1.5 * IQR
        outliers[col] = len(df[(df[col] < lower_bound) | (df[col] > upper_bound)])
    return outliers