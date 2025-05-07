import yaml
import os

class Config:
    def __init__(self, config_path="config.yaml"):
        with open(config_path, 'r') as file:
            self.config = yaml.safe_load(file)
        
    @property
    def data_paths(self):
        return self.config['data_paths']
    
    @property
    def model_path(self):
        return self.config['model_path']
    
    @property
    def clustering_params(self):
        return self.config['clustering_params']
    
    @property
    def search_params(self):
        return self.config['search_params']

CONFIG = Config()