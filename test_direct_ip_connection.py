import dj_database_url
import psycopg2

try:
    url = "postgresql://postgres:Mounesh%408845@db.tvrqghyjmuilsnglcuzx.supabase.co:5432/postgres"
    db_config = dj_database_url.parse(url)
    conn = psycopg2.connect(
        dbname='postgres',
        user='postgres.tvrqghyjmuilsnglcuzx',
        password=db_config['PASSWORD'],
        host='aws-0-us-west-1.pooler.supabase.com',
        hostaddr='52.8.172.168',
        port=6543
    )
    print("Connection successful to Supabase pooler via IPv4!")
    conn.close()
except Exception as e:
    print("Combined pooler connection error:", e)
