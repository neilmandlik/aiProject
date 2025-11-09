from sqlalchemy import create_engine
import os
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
from urllib.parse import quote_plus

load_dotenv()

username = os.getenv('MYSQL_USER')
password = quote_plus(os.getenv('MYSQL_PASSWORD'))
host = os.getenv('MYSQL_HOST')
port = os.getenv('MYSQL_PORT')
database = os.getenv('MYSQL_DB')

connect = (
    f"mysql+pymysql://{username}:{password}@{host}:{port}/{database}"
)

engine = create_engine(connect,echo=True)

sessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
