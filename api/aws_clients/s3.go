package awsclients

import (
	"context"
	"os"

	"github.com/aws/aws-sdk-go-v2/aws"
	s3manager "github.com/aws/aws-sdk-go-v2/feature/s3/manager"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/aws/aws-sdk-go-v2/service/s3/types"
)

type S3Client interface {
	UploadFile(bucket string, file *os.File, filename string) (string, error)
	ListBuckets() (*s3.ListBucketsOutput, error)
	CreateBucket(bucket string) error
	DeleteObject(bucket string, key string)
}

type awsS3 struct {
	client *s3.Client
}

func NewS3Client(config *aws.Config) *awsS3 {
	client := s3.NewFromConfig(*config)

	return &awsS3{
		client: client,
	}
}

// Returns uploaded file URL
func (c *awsS3) UploadFile(bucket string, file *os.File, filename string) (string, error) {
	uploader := s3manager.NewUploader(c.client)

	res, err := uploader.Upload(context.Background(), &s3.PutObjectInput{
		Bucket: aws.String(bucket),
		Body:   file,
		Key:    aws.String(filename),
		ACL:    types.ObjectCannedACLPublicRead,
	})
	if err != nil {
		return "", err
	}

	return res.Location, nil

}

// Returns list of all buckets
func (c *awsS3) ListBuckets() (*s3.ListBucketsOutput, error) {
	return c.client.ListBuckets(context.Background(), &s3.ListBucketsInput{})
}

func (c *awsS3) CreateBucket(bucket string) error {
	_, err := c.client.CreateBucket(context.Background(), &s3.CreateBucketInput{
		Bucket: aws.String(bucket),
	})

	if err != nil {
		return err
	}

	return nil
}

func (c *awsS3) DeleteObject(bucket string, key string) error {
	_, err := c.client.DeleteObject(context.Background(), &s3.DeleteObjectInput{
		Bucket: aws.String(bucket),
		Key:    aws.String(key),
	})

	if err != nil {
		return err
	}

	return nil
}
